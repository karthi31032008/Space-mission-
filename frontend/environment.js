
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export function createEnvironment(scene) {

    // SPACE LIGHT
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0x4488ff, 3, 100);
    mainLight.position.set(10, 15, 10);
    scene.add(mainLight);

    // SPACE FLOOR
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(300, 300),
        new THREE.MeshStandardMaterial({
            color: 0x080d20,
            roughness: 0.9
        })
    );

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    scene.add(floor);

    // STARS
    const starPositions = [];

    for (let i = 0; i < 2000; i++) {
        starPositions.push(
            (Math.random() - 0.5) * 300,
            Math.random() * 150,
            (Math.random() - 0.5) * 300
        );
    }

    const starGeometry = new THREE.BufferGeometry();

    starGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(starPositions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.6
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // DARK PLANET
    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(5, 32, 32),
        new THREE.MeshStandardMaterial({
            color: 0x442288,
            roughness: 0.8
        })
    );

    planet.position.set(15, 5, -30);
    scene.add(planet);

    // PLANET RING
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(7, 0.15, 8, 100),
        new THREE.MeshBasicMaterial({
            color: 0x00ccff
        })
    );

    ring.position.copy(planet.position);
    ring.rotation.x = Math.PI / 2.5;
    scene.add(ring);

    return {
        stars,
        planet,
        ring
    };
}
