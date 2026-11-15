
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// CREATE ENEMY
export function createEnemy(scene, position = new THREE.Vector3(0, 1, -15)) {
    const enemy = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 24, 24),
        new THREE.MeshStandardMaterial({
            color: 0xff2244,
            emissive: 0x660011,
            metalness: 0.4,
            roughness: 0.3
        })
    );

    enemy.add(body);

    const eyeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });

    const eye = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        eyeMaterial
    );

    eye.position.set(0, 0.15, 0.6);
    enemy.add(eye);

    enemy.position.copy(position);
    scene.add(enemy);

    return enemy;
}

// CREATE EXPLOSION
export function createExplosion(scene, position) {
    const explosion = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.MeshBasicMaterial({
            color: 0xff8800,
            transparent: true,
            opacity: 0.8
        })
    );

    explosion.position.copy(position);
    scene.add(explosion);

    return explosion;
}

// UPDATE EXPLOSIONS
export function updateExplosions(scene, explosions) {
    for (let i = explosions.length - 1; i >= 0; i--) {
        const item = explosions[i];

        item.scale.multiplyScalar(1.08);
        item.material.opacity -= 0.04;

        if (item.material.opacity <= 0) {
            scene.remove(item);
            item.geometry.dispose();
            item.material.dispose();
            explosions.splice(i, 1);
        }
    }
}
