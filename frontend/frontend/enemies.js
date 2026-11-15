  
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Create one alien enemy or boss
export function createEnemy(scene, x = 0, z = -20, isBoss = false) {
    const enemy = new THREE.Group();

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: isBoss ? 0x8b00ff : 0x22cc66,
        roughness: 0.6,
        metalness: 0.2
    });

    const eyeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff2222
    });

    // Body
    const body = new THREE.Mesh(
        new THREE.SphereGeometry(isBoss ? 1.5 : 0.7, 16, 16),
        bodyMaterial
    );
    body.position.y = isBoss ? 2 : 1;
    enemy.add(body);

    // Head
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(isBoss ? 0.9 : 0.45, 16, 16),
        bodyMaterial
    );
    head.position.y = isBoss ? 3.5 : 1.9;
    enemy.add(head);

    // Eyes
    for (const side of [-1, 1]) {
        const eye = new THREE.Mesh(
            new THREE.SphereGeometry(isBoss ? 0.18 : 0.1, 8, 8),
            eyeMaterial
        );

        eye.position.set(
            side * (isBoss ? 0.35 : 0.18),
            isBoss ? 3.55 : 1.95,
            isBoss ? 0.75 : 0.35
        );

        enemy.add(eye);
    }

    // Arms
    for (const side of [-1, 1]) {
        const arm = new THREE.Mesh(
            new THREE.BoxGeometry(
                isBoss ? 0.45 : 0.2,
                isBoss ? 1.8 : 0.9,
                isBoss ? 0.45 : 0.2
            ),
            bodyMaterial
        );

        arm.position.set(
            side * (isBoss ? 1.6 : 0.8),
            isBoss ? 2 : 1,
            0
        );

        enemy.add(arm);
    }

    enemy.position.set(x, 0, z);
    scene.add(enemy);

    return {
        mesh: enemy,
        hp: isBoss ? 100 : 30,
        maxHp: isBoss ? 100 : 30,
        speed: isBoss ? 0.025 : 0.06,
        isBoss,
        alive: true
    };
}

// Create visual explosion particles
export function createExplosion(scene, position, color = 0xff8800) {
    const particles = [];

    const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true
    });

    for (let i = 0; i < 18; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.12, 6, 6),
            material.clone()
        );

        particle.position.copy(position);
        scene.add(particle);

        particles.push({
            mesh: particle,
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.18,
                Math.random() * 0.18,
                (Math.random() - 0.5) * 0.18
            ),
            life: 1
        });
    }

    return particles;
}

// Update and remove explosion particles
export function updateExplosions(scene, explosions, delta = 0.016) {
    for (let i = explosions.length - 1; i >= 0; i--) {
        const particle = explosions[i];

        particle.mesh.position.addScaledVector(
            particle.velocity,
            delta * 60
        );

        particle.life -= delta;

        particle.mesh.material.opacity = Math.max(
            0,
            particle.life
        );

        if (particle.life <= 0) {
            scene.remove(particle.mesh);
            particle.mesh.geometry.dispose();
            particle.mesh.material.dispose();
            explosions.splice(i, 1);
        }
    }
}
