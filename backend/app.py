from flask import Flask, request, jsonify
from flask_cors import CORS

from firebase_config import get_firestore_db

app = Flask(__name__)
CORS(app)

# Home route
@app.route("/")
def home():
    return jsonify({
        "message": "Space Mission Game Backend is Running!"
    })


# Health check
@app.route("/api/health")
def health():
    return jsonify({
        "status": "success",
        "message": "Backend connected successfully"
    })


# Save player score
@app.route("/api/save-score", methods=["POST"])
def save_score():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "status": "error",
                "message": "No data received"
            }), 400

        player_name = str(
            data.get("player_name", "Player")
        )[:50]

        score = int(data.get("score", 0))
        distance = int(data.get("distance", 0))
        kills = int(data.get("kills", 0))

        if score < 0 or distance < 0 or kills < 0:
            return jsonify({
                "status": "error",
                "message": "Values cannot be negative"
            }), 400

        db = get_firestore_db()

        db.collection("game_scores").add({
            "player_name": player_name,
            "score": score,
            "distance": distance,
            "kills": kills
        })

        return jsonify({
            "status": "success",
            "message": "Score saved successfully"
        })

    except Exception as error:
        app.logger.exception("Score saving failed")

        return jsonify({
            "status": "error",
            "message": "Unable to save score"
        }), 500


# Get leaderboard
@app.route("/api/leaderboard", methods=["GET"])
def leaderboard():
    try:
        db = get_firestore_db()

        documents = (
            db.collection("game_scores")
            .order_by("score", direction="DESCENDING")
            .limit(10)
            .stream()
        )

        scores = []

        for document in documents:
            scores.append(document.to_dict())

        return jsonify({
            "status": "success",
            "leaderboard": scores
        })

    except Exception:
        app.logger.exception("Leaderboard loading failed")

        return jsonify({
            "status": "error",
            "message": "Unable to load leaderboard"
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )
  
