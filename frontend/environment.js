import * as THREE from
'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// =====================================
// SPACE ENVIRONMENT
// =====================================

export function createEnvironment(scene) {

    // BACKGROUND
    scene.background = new THREE.Color(0x020510);

    scene.fog = new THREE.Fog(
        0x020510,
        70,
        240
    );

    // LIGHTING
    scene.add(
        new THREE.HemisphereLight(
            0x9acaff,
            0x171025,
            2
        )
    );

    const light = new THREE.DirectionalLight(
        0xffffff,
        2
    );

    light.position.set(10, 20, 10);
    scene.add(light);

    // SPACE FLOOR
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({
            color: 0x101b30,
            roughness: 0.9
        })
    );

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.05;

    scene.add(floor);

    // GRID
    const grid = new THREE.GridHelper(
        200,
        100,
        0x17618c,
        0x172844
    );

    scene.add(grid);

    // STARS
    const starGeometry = new THREE.BufferGeometry();

    const starPositions = [];

    for (let i = 0; i < 1200; i++) {

        starPositions.push(
            (Math.random() - 0.5) * 180,
            Math.random() * 90,
            (Math.random() - 0.5) * 180
        );

    }

    starGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(
            starPositions,
            3
        )
    );

    const stars = new THREE.Points(
        starGeometry,
        new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.18
        })
    );

    scene.add(stars);

    // NEBULA EFFECT
    function createNebula(color, x, y, z, size) {

        const canvas = document.createElement('canvas');

        canvas.width = 256;
        canvas.height = 256;

        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(
            128, 128, 10,
            128, 128, 128
        );

        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;

        ctx.fillRect(0, 0, 256, 256);

        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.85,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const nebula = new THREE.Sprite(material);

        nebula.position.set(x, y, z);

        nebula.scale.set(size, size, 1);

        scene.add(nebula);
    }

    createNebula(
        'rgba(120, 0, 255, 0.8)',
        -25, 15, -90, 90
    );

    createNebula(
        'rgba(0, 100, 255, 0.8)',
        30, -10, -100, 100
    );

    createNebula(
        'rgba(255, 0, 100, 0.7)',
        0, 30, -110, 80
    );

    // DISTANT PLANET
    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(9, 32, 32),
        new THREE.MeshStandardMaterial({
            color: 0x174a93,
            roughness: 1
        })
    );

    planet.position.set(-35, 15, -65);

    scene.add(planet);

    // BLACK HOLE
    const blackHole = new THREE.Group();

    blackHole.position.set(12, 0, -18);

    scene.add(blackHole);

    // CENTRAL DARK SPHERE
    const hole = new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 32, 32),
        new THREE.MeshBasicMaterial({
            color: 0x000000
        })
    );

    hole.position.y = 2.5;

    blackHole.add(hole);

    // PURPLE RING
    const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(
            3.2, 0.18, 8, 80
        ),
        new THREE.MeshBasicMaterial({
            color: 0x963cff,
            side: THREE.DoubleSide
        })
    );

    ring1.position.y = 2.5;
    ring1.rotation.x = 1.2;

    blackHole.add(ring1);

    // BLUE RING
    const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(
            2.8, 0.1, 8, 80
        ),
        new THREE.MeshBasicMaterial({
            color: 0x26dfff
        })
    );

    ring2.position.y = 2.5;
    ring2.rotation.x = 1.4;

    blackHole.add(ring2);

    // RETURN OBJECTS
    return {
        stars,
        planet,
        blackHole,
        ring1,
        ring2
    };

}
