
const API_BASE_URL = "https://space-mission-14fj.onrender.com";

// SAVE PLAYER SCORE
export async function savePlayerScore(playerName, score, distance = 0, kills = 0) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/save-score`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                player_name: playerName,
                score: score,
                distance: distance,
                kills: kills
            })
        });

        if (!response.ok) {
            throw new Error("Score save failed");
        }

        return await response.json();

    } catch (error) {
        console.error("Save score error:", error);
        return null;
    }
}

// GET LEADERBOARD
export async function getLeaderboard() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leaderboard`);

        if (!response.ok) {
            throw new Error("Leaderboard loading failed");
        }

        return await response.json();

    } catch (error) {
        console.error("Leaderboard error:", error);
        return [];
    }
}
