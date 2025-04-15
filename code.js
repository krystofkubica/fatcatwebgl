// hi
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

let controls;
const moveSpeed = 0.1;
const moveState = {
    forward: false,
    backward: false,
    left: false,
    right: false
};

let cat;

function init() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    camera.position.y = 1.6;
    controls = new PointerLockControls(camera, document.body);
    
    createScene();
    
    setupEventListeners();
    
    animate();
}

function createScene() {
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x555555, 
        side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    
    createCat();
}

function createCat() {
    cat = new THREE.Group();
    
    const furColor = 0x9c7b54;
    const darkFurColor = 0x6a5336;
    const eyeColor = 0x65f74a;
    const noseColor = 0xfc7c9c;
    
    const bodyGeometry = new THREE.SphereGeometry(2, 32, 24);
    bodyGeometry.scale(1.8, 1, 1.2);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: furColor,
        roughness: 0.8 
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.8, 0);
    cat.add(body);
    
    const headGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ 
        color: furColor,
        roughness: 0.7 
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 1.3, 2.2);
    cat.add(head);
    
    const eyeGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const eyeMaterial = new THREE.MeshStandardMaterial({ 
        color: eyeColor,
        emissive: eyeColor,
        emissiveIntensity: 0.2 
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(0.5, 1.7, 3.1);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(-0.5, 1.7, 3.1);
    
    cat.add(leftEye);
    cat.add(rightEye);
    
    const pupilGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(0.5, 1.7, 3.25);
    
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(-0.5, 1.7, 3.25);
    
    cat.add(leftPupil);
    cat.add(rightPupil);
    
    const earGeometry = new THREE.ConeGeometry(0.5, 1, 4);
    const earMaterial = new THREE.MeshStandardMaterial({ color: furColor });
    
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(0.7, 2.3, 2.2);
    leftEar.rotation.x = -Math.PI / 4;
    leftEar.rotation.z = -Math.PI / 4;
    
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(-0.7, 2.3, 2.2);
    rightEar.rotation.x = -Math.PI / 4;
    rightEar.rotation.z = Math.PI / 4;
    
    cat.add(leftEar);
    cat.add(rightEar);
    
    const noseGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const noseMaterial = new THREE.MeshStandardMaterial({ color: noseColor });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 1.3, 3.5);
    nose.scale.set(1, 0.8, 0.5);
    cat.add(nose);
    
    const tailCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.8, -2),
        new THREE.Vector3(0, 2, -3),
        new THREE.Vector3(0, 3, -2.5),
        new THREE.Vector3(0, 3.5, -1.5)
    ]);
    
    const tailGeometry = new THREE.TubeGeometry(tailCurve, 20, 0.3, 8, false);
    const tailMaterial = new THREE.MeshStandardMaterial({ color: furColor });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    cat.add(tail);
    
    const legGeometry = new THREE.CylinderGeometry(0.3, 0.2, 1.5, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ color: furColor });
    
    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontLeftLeg.position.set(1, -0.4, 1.7);
    
    const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontRightLeg.position.set(-1, -0.4, 1.7);
    
    const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    backLeftLeg.position.set(1, -0.4, -1.3);
    
    const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    backRightLeg.position.set(-1, -0.4, -1.3);
    
    cat.add(frontLeftLeg);
    cat.add(frontRightLeg);
    cat.add(backLeftLeg);
    cat.add(backRightLeg);
    
    addCatStripes(body, darkFurColor);
    
    cat.scale.set(5, 5, 5);
    cat.position.set(0, 5, 0);
    
    scene.add(cat);
}

function addCatStripes(body, stripeColor) {
    const stripeGeometry = new THREE.BoxGeometry(3.7, 0.1, 0.1);
    const stripeMaterial = new THREE.MeshStandardMaterial({ color: stripeColor });
    
    for (let i = 0; i < 5; i++) {
        const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
        stripe.position.set(0, 0.3 + (i * 0.3), 0);
        stripe.rotation.z = Math.random() * 0.2 - 0.1;
        stripe.rotation.y = Math.PI / 2;
        body.add(stripe);
    }
}

function setupEventListeners() {
    document.addEventListener('click', () => {
        controls.lock();
    });
    
    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'KeyW':
                moveState.forward = true;
                break;
            case 'KeyA':
                moveState.left = true;
                break;
            case 'KeyS':
                moveState.backward = true;
                break;
            case 'KeyD':
                moveState.right = true;
                break;
        }
    });
    
    document.addEventListener('keyup', (event) => {
        switch (event.code) {
            case 'KeyW':
                moveState.forward = false;
                break;
            case 'KeyA':
                moveState.left = false;
                break;
            case 'KeyS':
                moveState.backward = false;
                break;
            case 'KeyD':
                moveState.right = false;
                break;
        }
    });
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animate() {
    requestAnimationFrame(animate);
    
    if (controls.isLocked) {
        const speed = moveSpeed;
        
        if (moveState.forward) {
            controls.moveForward(speed);
        }
        if (moveState.backward) {
            controls.moveForward(-speed);
        }
        if (moveState.left) {
            controls.moveRight(-speed);
        }
        if (moveState.right) {
            controls.moveRight(speed);
        }
    }
    
    if (cat) {
        cat.rotation.y += 0.01;
    }
    
    renderer.render(scene, camera);
}

init();