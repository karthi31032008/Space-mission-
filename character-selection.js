const characters = [
    {
        name: "Alex",
        power: "Energy Shield",
        description: "Defensive astronaut"
    },
    {
        name: "Luna",
        power: "Rapid Fire",
        description: "Fast shooting astronaut"
    },
    {
        name: "Max",
        power: "Health Boost",
        description: "Health recovery astronaut"
    },
    {
        name: "Nova",
        power: "Gravity Pulse",
        description: "Gravity power astronaut"
    }
];

const panel = document.createElement("div");

panel.id = "characterSelection";

panel.innerHTML = `
    <h2>SELECT YOUR ASTRONAUT</h2>
    <div class="character-list">
        ${characters.map(character => `
            <button class="character-card"
                data-character="${character.name}">
                <h3>${character.name}</h3>
                <p>${character.description}</p>
                <strong>${character.power}</strong>
            </button>
        `).join("")}
    </div>
    <p id="selectedCharacter">
        Choose your character
    </p>
`;

const style = document.createElement("style");

style.textContent = `
    #characterSelection {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 650px;
        padding: 20px;
        background: rgba(5, 10, 30, 0.96);
        color: white;
        border: 2px solid cyan;
        border-radius: 15px;
        text-align: center;
        z-index: 9999;
        font-family: Arial, sans-serif;
    }

    .character-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    .character-card {
        padding: 18px 8px;
        background: #101b3c;
        color: white;
        border: 1px solid cyan;
        border-radius: 10px;
        cursor: pointer;
    }

    .character-card:hover {
        background: #164c68;
        transform: scale(1.03);
    }

    .character-card h3 {
        color: cyan;
    }

    #selectedCharacter {
        color: #00ff99;
        margin-top: 15px;
    }
`;

document.head.appendChild(style);
document.body.appendChild(panel);

document.querySelectorAll(".character-card").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.character;

        if (typeof window.selectAstronaut === "function") {
            window.selectAstronaut(name);

            document.getElementById("selectedCharacter").textContent =
                name + " selected!";

            panel.style.display = "none";
        } else {
            document.getElementById("selectedCharacter").textContent =
                "Character selection function not found!";
        }
    });
});

// CHARACTER SELECTION EFFECTS

document.querySelectorAll(".character-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.boxShadow = "0 0 20px cyan";
    });

    card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "none";
    });
});

// START GAME BUTTON

const startButton = document.createElement("button");

startButton.textContent = "START MISSION";
startButton.id = "startMission";

startButton.style.cssText = `
    margin-top: 20px;
    padding: 14px 35px;
    background: cyan;
    color: #001020;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
`;

panel.appendChild(startButton);

startButton.addEventListener("click", () => {
    const selected = document.getElementById("selectedCharacter");

    if (!selected.textContent.includes("selected!")) {
        selected.textContent = "First select an astronaut!";
        return;
    }

    panel.style.display = "none";

    if (typeof window.startGame === "function") {
        window.startGame();
    }
});
