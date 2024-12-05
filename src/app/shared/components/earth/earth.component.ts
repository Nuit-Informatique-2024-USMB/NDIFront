import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {OceanPanelComponent} from "../ocean-panel/ocean-panel.component";
import {Ocean, OCEANS} from "../../../core/models/oceans.model";


@Component({
    selector: 'app-globe',
    standalone: true,
    imports: [CommonModule, OceanPanelComponent],
    template: `
        <div class="globe-container">
            <canvas #globeCanvas></canvas>

            <div *ngIf="hoveredOcean" class="ocean-name">
                {{ hoveredOcean }}
            </div>

            <app-ocean-panel
                [ocean]="selectedOcean"
                (close)="closePanel()">
            </app-ocean-panel>
        </div>
    `,
    styles: [`
        .globe-container {
            width: 100%;
            height: 100vh;
            background: #000;
            position: relative;
        }
        canvas {
            width: 100%;
            height: 100%;
        }
        .ocean-name {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 48px;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            pointer-events: none;
            z-index: 1000;
        }
    `]
})
export class EarthComponent implements AfterViewInit {
    @ViewChild('globeCanvas') private canvasRef!: ElementRef;

    private camera!: THREE.PerspectiveCamera;
    private scene!: THREE.Scene;
    private renderer!: THREE.WebGLRenderer;
    private globe!: THREE.Mesh;
    private controls!: OrbitControls;
    private raycaster = new THREE.Raycaster();
    private mouse = new THREE.Vector2();
    private oceanPoints: THREE.Mesh[] = [];

    private isRotating: boolean = true;
    private autoRotationSpeed: number = 0.001;

    hoveredOcean: string | null = null;
    selectedOcean: Ocean | null = null;

    private readonly EARTH_RADIUS = 5;
    private readonly CAMERA_DISTANCE = 15;

    private defaultCameraPosition = new THREE.Vector3(0, 0, this.CAMERA_DISTANCE);
    private targetCameraPosition = new THREE.Vector3();
    private isAnimating = false;
    private readonly ZOOM_DURATION = 1000; // durée en millisecondes
    private readonly ZOOM_FACTOR = 0.7; // facteur de zoom (plus petit = plus zoomé)
    private animationStartTime = 0;

    constructor() {
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        document.addEventListener('mousemove', (event) => this.onMouseMove(event));
        document.addEventListener('click', (event) => this.onClick(event));
    }

    ngAfterViewInit() {
        this.initThreeJS();
        this.createGlobe();
        this.createOceanPoints();
        this.animate();
    }

    private initThreeJS(): void {
        this.scene = new THREE.Scene();

        const aspectRatio = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
        this.camera.position.z = this.CAMERA_DISTANCE;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvasRef.nativeElement,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.rotateSpeed = 0.5;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.rotateSpeed = 0.5;
        this.controls.minDistance = this.CAMERA_DISTANCE * this.ZOOM_FACTOR; // Distance minimum de zoom
        this.controls.maxDistance = this.CAMERA_DISTANCE * 1.2; // Distance maximum de zoom

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);

        window.addEventListener('resize', () => this.onWindowResize());
    }

    private createGlobe(): void {
        const geometry = new THREE.SphereGeometry(this.EARTH_RADIUS, 32, 32);
        const textureLoader = new THREE.TextureLoader();
        const earthTexture = textureLoader.load('assets/earth-texture.jpg');

        const material = new THREE.MeshPhongMaterial({
            map: earthTexture,
            bumpScale: 0.1
        });

        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);
    }

    private latLongToVector3(latitude: number, longitude: number): THREE.Vector3 {
        const phi = (90 - latitude) * (Math.PI / 180);
        const theta = (longitude + 180) * (Math.PI / 180);

        const x = -this.EARTH_RADIUS * Math.sin(phi) * Math.cos(theta);
        const y = this.EARTH_RADIUS * Math.cos(phi);
        const z = this.EARTH_RADIUS * Math.sin(phi) * Math.sin(theta);

        return new THREE.Vector3(x, y, z);
    }

    // Modifiez la méthode createOceanPoints pour ajouter le cursor pointer
    private createOceanPoints(): void {
        const geometry = new THREE.SphereGeometry(0.1, 16, 16);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.8
        });

        OCEANS.forEach(ocean => {
            const position = this.latLongToVector3(
                ocean.position.latitude,
                ocean.position.longitude
            );
            const point = new THREE.Mesh(geometry, material.clone());
            point.position.copy(position);
            point.userData = ocean;
            // Ajout du style cursor pointer
            this.oceanPoints.push(point);
            this.globe.add(point);
        });

        // Ajoutez ces styles au composant
        document.body.style.cursor = 'default';
        this.renderer.domElement.style.cursor = 'default';
    }


    private animate(): void {
        requestAnimationFrame(() => this.animate());

        if (this.isRotating && !this.isAnimating) {
            this.globe.rotation.y += this.autoRotationSpeed;
        }

        if (this.isAnimating) {
            this.updateCameraPosition();
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    private onMouseMove(event: MouseEvent): void {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.oceanPoints);

        // Réinitialiser tous les points à leur taille normale
        this.oceanPoints.forEach(point => {
            point.scale.set(1, 1, 1);
        });

        if (intersects.length > 0) {
            const intersectedPoint = intersects[0].object as THREE.Mesh;
            const ocean = intersectedPoint.userData as Ocean;
            this.hoveredOcean = ocean.name;
            intersectedPoint.scale.set(1.5, 1.5, 1.5);
            this.isRotating = false;  // Arrêter la rotation
            this.renderer.domElement.style.cursor = 'pointer'; // Changer le cursor
        } else {
            this.hoveredOcean = null;
            this.renderer.domElement.style.cursor = 'default';
            // Reprendre la rotation seulement si aucun panel n'est ouvert
            this.isRotating = !this.selectedOcean;
        }
    }

    private onClick(event: MouseEvent): void {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.oceanPoints);

        if (intersects.length > 0) {
            const ocean = intersects[0].object.userData as Ocean;
            this.selectedOcean = ocean;
            this.isRotating = false;

            // Calculer la position cible pour le point
            const point = intersects[0].object;
            const pointWorldPosition = new THREE.Vector3();
            point.getWorldPosition(pointWorldPosition);

            // Normaliser la position et ajuster pour le zoom
            const direction = pointWorldPosition.clone().normalize();
            this.targetCameraPosition.copy(direction.multiplyScalar(this.CAMERA_DISTANCE * this.ZOOM_FACTOR));

            // Démarrer l'animation
            this.startZoomAnimation(true);
        }
    }

    private startZoomAnimation(zoomIn: boolean): void {
        this.isAnimating = true;
        this.animationStartTime = Date.now();

        if (!zoomIn) {
            // Pour le dézoom, on retourne à la position initiale
            this.targetCameraPosition.copy(this.defaultCameraPosition);
        }
    }

    private onWindowResize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    private updateCameraPosition(): void {
        if (!this.isAnimating) return;

        const currentTime = Date.now();
        const elapsed = currentTime - this.animationStartTime;
        const progress = Math.min(elapsed / this.ZOOM_DURATION, 1);

        // Fonction d'easing pour une animation plus fluide
        const easeProgress = this.easeInOutCubic(progress);

        // Interpoler la position de la caméra
        const newPosition = new THREE.Vector3();
        newPosition.lerpVectors(
            this.camera.position,
            this.targetCameraPosition,
            easeProgress
        );

        this.camera.position.copy(newPosition);
        this.camera.lookAt(0, 0, 0);

        if (progress === 1) {
            this.isAnimating = false;
        }
    }

    private easeInOutCubic(t: number): number {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    closePanel(): void {
        this.selectedOcean = null;
        this.startZoomAnimation(false); // Démarre l'animation de dézoom
        this.isRotating = true;
    }

    ngOnDestroy(): void {
        window.removeEventListener('resize', () => this.onWindowResize());
        document.removeEventListener('mousemove', (event) => this.onMouseMove(event));
        document.removeEventListener('click', (event) => this.onClick(event));
    }
}
