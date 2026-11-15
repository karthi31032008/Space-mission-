const API_BASE_URL = "https://YOUR-RENDER-SERVICE.onrender.com";

// Save player score
export async function savePlayerScore(playerData) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/save-score`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    player_name: playerData.player_name,
                    score: playerData.score,
                    distance: playerData.distance,
                    kills: playerData.kills
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Score saving failed");
        }

        return result;

    } catch (error) {
        console.error("Save score error:", error);
        throw error;
    }
}


// Get leaderboard
export async function getLeaderboard() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/leaderboard`
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Leaderboard loading failed");
        }

        return result.leaderboard;

    } catch (error) {
        console.error("Leaderboard error:", error);
        throw error;
    }
}
