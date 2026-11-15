
from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_config import get_firestore_db
from google.cloud import firestore
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "message": "Space Mission Game Backend is Running!"
    })


@app.route("/api/health")
def health():
    return jsonify({
        "status": "success",
        "message": "Backend connected successfully"
    })


@app.route("/api/save-score", methods=["POST"])
def save_score():
    try:
        data = request.get_json(silent=True) or {}

        player_name = str(data.get("player_name", "Player"))[:30]
        score = int(data.get("score", 0))
        distance = float(data.get("distance", 0))
        kills = int(data.get("kills", 0))

        if score < 0 or distance < 0 or kills < 0:
            return jsonify({"error": "Invalid score data"}), 400

        db = get_firestore_db()

        score_data = {
            "player_name": player_name,
            "score": score,
            "distance": distance,
            "kills": kills
        }

        db.collection("game_scores").add(score_data)

        return jsonify({
            "status": "success",
            "message": "Score saved successfully"
        })

    except Exception as error:
        print("Save score error:", error)
        return jsonify({"error": "Could not save score"}), 500


@app.route("/api/leaderboard", methods=["GET"])
def leaderboard():
    try:
        db = get_firestore_db()

        scores = (
            db.collection("game_scores")
            .order_by("score", direction=firestore.Query.DESCENDING)
            .limit(10)
            .stream()
        )

        result = []

        for item in scores:
            result.append(item.to_dict())

        return jsonify({
            "status": "success",
            "leaderboard": result
        })

    except Exception as error:
        print("Leaderboard error:", error)
        return jsonify({"error": "Could not load leaderboard"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
    
