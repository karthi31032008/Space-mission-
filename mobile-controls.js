
// =====================================
// MOBILE GAME CONTROLS
// =====================================

const controls = document.createElement("div");

controls.id = "mobileControls";

controls.innerHTML = `
    <div class="moveControls">
        <button data-key="KeyW">▲</button>

        <div>
            <button data-key="KeyA">◀</button>
            <button data-key="KeyS">▼</button>
            <button data-key="KeyD">▶</button>
        </div>
    </div>

    <div class="actionControls">
        <button id="jumpBtn">JUMP</button>
        <button id="shootBtn">FIRE</button>
        <button id="powerBtn">POWER</button>
    </div>
`;

document.body.appendChild(controls);

// CSS
const style = document.createElement("style");

style.textContent = `
#mobileControls {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 100;
    pointer-events: none;
}

#mobileControls button {
    pointer-events: auto;
    background: #102c50dd;
    color: #43eaff;
    border: 1px solid #43eaff;
    border-radius: 12px;
    padding: 15px;
    font-size: 17px;
    font-weight: bold;
    touch-action: none;
}

.moveControls {
    position: absolute;
    bottom: 35px;
    left: 20px;
    text-align: center;
}

.moveControls div {
    display: flex;
    gap: 8px;
}

.actionControls {
    position: absolute;
    bottom: 35px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#shootBtn {
    background: #8b1525dd !important;
}

#powerBtn {
    background: #493080dd !important;
}

@media (max-width: 900px) {
    #mobileControls {
        display: block;
    }
}
`;

document.head.appendChild(style);

// MOVEMENT BUTTONS
function pressKey(code) {
    window.dispatchEvent(
        new KeyboardEvent("keydown", {
            code: code,
            bubbles: true
        })
    );
}

function releaseKey(code) {
    window.dispatchEvent(
        new KeyboardEvent("keyup", {
            code: code,
            bubbles: true
        })
    );
}

controls.querySelectorAll("[data-key]").forEach(button => {

    const key = button.dataset.key;

    button.addEventListener("pointerdown", e => {
        e.preventDefault();
        pressKey(key);
    });

    ["pointerup", "pointerleave", "pointercancel"].forEach(event => {
        button.addEventListener(event, () => releaseKey(key));
    });
});

// JUMP
document.getElementById("jumpBtn").addEventListener(
    "pointerdown",
    () => pressKey("Space")
);

document.getElementById("jumpBtn").addEventListener(
    "pointerup",
    () => releaseKey("Space")
);

// SHOOT
document.getElementById("shootBtn").addEventListener(
    "pointerdown",
    () => {
        window.dispatchEvent(
            new MouseEvent("mousedown", {
                button: 0,
                bubbles: true
            })
        );
    }
);

// SPECIAL POWER
document.getElementById("powerBtn").addEventListener(
    "pointerdown",
    () => pressKey("KeyE")
);

document.getElementById("powerBtn").addEventListener(
    "pointerup",
    () => releaseKey("KeyE")
);
