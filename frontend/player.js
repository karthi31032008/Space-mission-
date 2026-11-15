
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export function createPlayer(scene) {
    const player = new THREE.Group();

    // Astronaut body
    const body = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.5, 1, 4, 12),
        new THREE.MeshStandardMaterial({
            color: 0x00ccff,
            metalness: 0.4,
            roughness: 0.3
        })
    );

    player.add(body);

    // Helmet
    const helmet = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 24, 24),
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.6,
            roughness: 0.2
        })
    );

    helmet.position.y = 0.9;
    player.add(helmet);

    // Backpack
    const backpack = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.8, 0.35),
        new THREE.MeshStandardMaterial({
            color: 0x333344
        })
    );

    backpack.position.set(0, 0.1, 0.5);
    player.add(backpack);

    // Add player to scene
    player.position.set(0, 0, 0);
    scene.add(player);

    return player;
}

export function selectAstronaut(scene) {
    return createPlayer(scene);
}
