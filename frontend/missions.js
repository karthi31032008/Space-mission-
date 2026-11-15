export const missionList = [
    {
        name: "Mission 1: Space Exploration",
        objective: "Explore the galaxy and travel 1000 meters.",
        target: 1000,
        type: "distance"
    },
    {
        name: "Mission 2: Alien Encounter",
        objective: "Defeat 5 alien enemies.",
        target: 5,
        type: "kills"
    },
    {
        name: "Mission 3: Science Discovery",
        objective: "Collect 3 science discoveries.",
        target: 3,
        type: "science"
    },
    {
        name: "Mission 4: Galaxy Guardian",
        objective: "Defeat the galaxy boss.",
        target: 1,
        type: "boss"
    }
];

export function createMissionState() {
    return {
        currentMission: 0,
        distance: 0,
        kills: 0,
        science: 0,
        bossDefeated: false,
        completed: false
    };
}

export function updateMission(state, type, amount = 1) {
    if (state.completed) {
        return getMissionProgress(state);
    }

    if (type === "distance") {
        state.distance += amount;
    } else if (type === "kills") {
        state.kills += amount;
    } else if (type === "science") {
        state.science += amount;
    } else if (type === "boss") {
        state.bossDefeated = true;
    }

    const mission = missionList[state.currentMission];

    if (!mission) {
        state.completed = true;
        return getMissionProgress(state);
    }

    let completed = false;

    if (mission.type === "distance") {
        completed = state.distance >= mission.target;
    } else if (mission.type === "kills") {
        completed = state.kills >= mission.target;
    } else if (mission.type === "science") {
        completed = state.science >= mission.target;
    } else if (mission.type === "boss") {
        completed = state.bossDefeated;
    }

    if (completed) {
        state.currentMission++;

        if (state.currentMission >= missionList.length) {
            state.completed = true;
        }
    }

    return getMissionProgress(state);
}

export function getMissionProgress(state) {
    if (state.completed) {
        return {
            name: "All Missions Completed!",
            objective: "Congratulations! You explored the galaxy.",
            progress: 100,
            completed: true
        };
    }

    const mission = missionList[state.currentMission];

    if (!mission) {
        return {
            name: "All Missions Completed!",
            objective: "Congratulations!",
            progress: 100,
            completed: true
        };
    }

    let current = 0;

    if (mission.type === "distance") {
        current = state.distance;
    } else if (mission.type === "kills") {
        current = state.kills;
    } else if (mission.type === "science") {
        current = state.science;
    } else if (mission.type === "boss") {
        current = state.bossDefeated ? 1 : 0;
    }

    return {
        name: mission.name,
        objective: mission.objective,
        progress: Math.min(
            100,
            Math.floor((current / mission.target) * 100)
        ),
        completed: false
    };
}
