
export function createMissionState() {
    return {
        currentMission: 1,
        score: 0,
        enemiesDefeated: 0,
        targetKills: 5,
        completed: false
    };
}

export function updateMission(mission, action) {

    if (mission.completed) {
        return mission;
    }

    if (action === 'kill') {
        mission.enemiesDefeated++;
    }

    if (mission.enemiesDefeated >= mission.targetKills) {
        mission.completed = true;
    }

    return mission;
}

export function getMissionProgress(mission) {

    return {
        current: mission.enemiesDefeated,
        target: mission.targetKills,
        percentage: Math.min(
            100,
            (mission.enemiesDefeated / mission.targetKills) * 100
        ),
        completed: mission.completed
    };
}
