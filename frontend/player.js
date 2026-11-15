import * as THREE from
'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// =====================================
// ASTRONAUT PLAYER
// =====================================

export function createPlayer(scene) {

    const player = new THREE.Group();

    scene.add(player);

    // MATERIALS
    const suit = new THREE.MeshStandardMaterial({
        color: 0xe5edf5
    });

    const blue = new THREE.MeshStandardMaterial({
        color: 0x159bd5
    });

    const dark = new THREE.MeshStandardMaterial({
        color: 0x18243a
    });

    const gold = new THREE.MeshStandardMaterial({
        color: 0xffc928,
        emissive: 0x332000
    });

    // CREATE PART
    function part(parent, geometry, material, x, y, z) {

        const mesh = new THREE.Mesh(
            geometry,
            material
        );

        mesh.position.set(x, y, z);

        parent.add(mesh);

        return mesh;
    }

    // BODY
    part(
        player,
        new THREE.CapsuleGeometry(0.42, 0.8, 5, 10),
        suit,
        0, 1.15, 0
    );

    // HEAD
    part(
        player,
        new THREE.SphereGeometry(0.38, 16, 16),
        suit,
        0, 2.05, 0
    );

    // HELMET GLASS
    part(
        player,
        new THREE.SphereGeometry(0.29, 16, 16),

        new THREE.MeshStandardMaterial({
            color: 0x35bafa,
            metalness: 0.6,
            roughness: 0.15
        }),

        0, 2.08, -0.19
    );

    // BACKPACK
    part(
        player,
        new THREE.BoxGeometry(0.65, 0.85, 0.3),
        blue,
        0, 1.3, 0.38
    );

    // LEFT ARM
    const arm1 = part(
        player,
        new THREE.CapsuleGeometry(0.14, 0.65, 4, 8),
        suit,
        -0.52, 1.35, 0
    );

    arm1.rotation.z = -0.2;

    // RIGHT ARM
    const arm2 = part(
        player,
        new THREE.CapsuleGeometry(0.14, 0.65, 4, 8),
        suit,
        0.52, 1.35, 0
    );

    arm2.rotation.z = 0.2;

    // LEFT LEG
    part(
        player,
        new THREE.CapsuleGeometry(0.17, 0.65, 5, 8),
        dark,
        -0.22, 0.42, 0
    );

    // RIGHT LEG
    part(
        player,
        new THREE.CapsuleGeometry(0.17, 0.65, 5, 8),
        dark,
        0.22, 0.42, 0
    );

    // LASER GUN
    const gun = new THREE.Group();

    player.add(gun);

    gun.position.set(0.55, 1.35, -0.65);

    part(
        gun,
        new THREE.BoxGeometry(0.18, 0.18, 0.8),
        dark,
        0, 0, -0.15
    );

    part(
        gun,
        new THREE.BoxGeometry(0.12, 0.1, 0.25),
        gold,
        0, 0.1, -0.6
    );

    return player;
}


// =====================================
// ASTRONAUT SELECTION
// =====================================

export const astronautPowers = {

    Alex: "Energy Shield",

    Luna: "Laser Boost",

    Max: "Health Repair",

    Nova: "Gravity Pulse"

};


export function selectAstronaut(name, state) {

    if (!astronautPowers[name]) return;

    state.astronaut = name;

    const hero = document.getElementById("hero");

    const message = document.getElementById("message");

    if (hero) {
        hero.textContent = name;
    }

    if (message) {

        message.textContent =
            name + " selected: " + astronautPowers[name];

    }

}
