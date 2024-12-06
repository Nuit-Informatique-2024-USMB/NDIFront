import { Component, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OceanPanelComponent } from "../ocean-panel/ocean-panel.component";
import { OceanService } from "../../../core/services/ocean.service"; // Assurez-vous d'importer le service
import { Ocean } from "../../../core/services/ocean.service"; // Import the Ocean interface

@Component({
    selector: 'app-globe',
    standalone: true,
    imports: [CommonModule, OceanPanelComponent],
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
    `],
    templateUrl: './earth.component.html'
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
    private oceanPoints: THREE.Group[] = [];

    private pointScales: Map<THREE.Group, {current: number, target: number}> = new Map();

    private isRotating: boolean = true;
    private autoRotationSpeed: number = 0.001;

    hoveredOcean: string | null = null;
    selectedOcean: Ocean | null = null;

    private readonly EARTH_RADIUS = 5;
    private readonly CAMERA_DISTANCE = 9;

    private defaultCameraPosition = new THREE.Vector3(0, 0, this.CAMERA_DISTANCE);
    private targetCameraPosition = new THREE.Vector3();
    private isAnimating = false;
    private readonly ZOOM_DURATION = 3000; // durée en millisecondes
    private readonly ZOOM_FACTOR = 0.9; // facteur de zoom (plus petit = plus zoomé)
    private animationStartTime = 0;

    constructor(private oceanService: OceanService) {
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        document.addEventListener('mousemove', (event) => this.onMouseMove(event));
        document.addEventListener('click', (event) => this.onClick(event));
    }

    ngOnInit() {
        // Appel de la méthode getOceans pour récupérer les océans
        this.oceanService.getOceans().subscribe(oceans => {
        // Créez des points pour chaque océan
        this.createOceanPoints(oceans);
        });
    }

    
    ngAfterViewInit() {
        this.initThreeJS();
        this.createGlobe();
        //this.createOceanPoints();
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
        const gradientTexture = this.createRadialGradientTexture('#87CEEB', '#238b9c');

        this.scene.background = gradientTexture;
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

        const ambientLight = new THREE.AmbientLight(0xffffff, 3);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 6);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);

        window.addEventListener('resize', () => this.onWindowResize());
    }

    private createGlobe(): void {
        const geometry = new THREE.SphereGeometry(this.EARTH_RADIUS, 64, 64); // Plus de segments pour des détails précis
        const textureLoader = new THREE.TextureLoader();

        // Charger les textures
        const earthTexture = textureLoader.load('assets/earth-texture.jpg');
        const normalMap = textureLoader.load('assets/earth-normal-map.jpg'); // Mappe de normales
        const displacementMap = textureLoader.load('assets/earth-displacement.jpeg'); // Mappe de hauteur



        // Matériau du globe
        const material = new THREE.MeshPhongMaterial({
            map: earthTexture,
            normalMap: normalMap, // Ajouter une mappe de normales pour les détails des reliefs
            displacementMap: displacementMap, // Mappe pour les reliefs
            displacementScale: 0.3,
            normalScale: new THREE.Vector2(0.8, 0.8)
        });


        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);

        const cloudGeometry = new THREE.SphereGeometry(this.EARTH_RADIUS + 0.15, 64, 64);
        const cloudTexture = textureLoader.load('assets/earth-clouds.png');
        const cloudMaterial = new THREE.MeshPhongMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.8
        });

        const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloudMesh.name = 'cloudMesh';
        this.scene.add(cloudMesh);

        cloudMesh.rotation.y = Math.random() * Math.PI * 2;
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
    private createOceanPoints(oceans: Ocean[]): void {
        const mainGeometry = new THREE.CircleGeometry(0.13, 16);
        const mainMaterial = new THREE.MeshBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 1,
          depthTest: true,
          side: THREE.DoubleSide
        });
    
        const borderGeometry = new THREE.RingGeometry(0.13, 0.16, 32);
        const borderMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 1,
          depthTest: true,
          side: THREE.DoubleSide
        });
    
        const centerGeometry = new THREE.CircleGeometry(0.04, 32);
        const centerMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 1,
          depthTest: true,
          side: THREE.DoubleSide
        });
    
        oceans.forEach(ocean => {
          const point = new THREE.Group();
    
          const mainPoint = new THREE.Mesh(mainGeometry, mainMaterial.clone());
          const border = new THREE.Mesh(borderGeometry, borderMaterial.clone());
          const centerPoint = new THREE.Mesh(centerGeometry, centerMaterial.clone());
    
          point.add(mainPoint);
          point.add(border);
          point.add(centerPoint);
    
          // Position
          const position = this.latLongToVector3(ocean.position.latitude, ocean.position.longitude);
          point.position.copy(position.normalize().multiplyScalar(this.EARTH_RADIUS + 0.3));
          point.userData = ocean;
    
          this.oceanPoints.push(point);
          this.globe.add(point);
        });
      }


    private animate(): void {
        requestAnimationFrame(() => this.animate());

        // Faire face à la caméra pour chaque point
        this.oceanPoints.forEach(point => {
            point.lookAt(this.camera.position);
            point.rotateY(Math.PI); // Pour s'assurer que les points sont bien orientés
        });

        // Le reste de votre code d'animation...
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
        const allMeshes = this.oceanPoints.flatMap(group => group.children);
        const intersects = this.raycaster.intersectObjects(allMeshes);

        // Réinitialiser les échelles cibles
        this.oceanPoints.forEach(group => {
            const scale = this.pointScales.get(group);
            if (scale) scale.target = 1;
        });

        if (intersects.length > 0) {
            const group: any = intersects[0].object.parent;
            if (group) {
                const ocean = group.userData as Ocean;
                this.hoveredOcean = ocean.name;
                const scale = this.pointScales.get(group);
                if (scale) scale.target = 1.5;
                this.isRotating = false;
                this.renderer.domElement.style.cursor = 'pointer';
            }
        } else {
            this.hoveredOcean = null;
            this.renderer.domElement.style.cursor = 'default';
            // Modifié ici : ne réactiver la rotation que s'il n'y a pas de sélection
            if (!this.selectedOcean) {
                this.isRotating = true;
            }
        }
    }

    private onClick(event: MouseEvent): void {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const allMeshes = this.oceanPoints.flatMap(group => group.children);
        const intersects = this.raycaster.intersectObjects(allMeshes);

        if (intersects.length > 0) {
            const group = intersects[0].object.parent;
            if (group) {
                const ocean = group.userData as Ocean;
                this.selectedOcean = ocean;
                this.isRotating = false;

                // Calculer la position cible pour le point
                const pointWorldPosition = new THREE.Vector3();
                group.getWorldPosition(pointWorldPosition);

                // Normaliser la position et ajuster pour le zoom
                const direction = pointWorldPosition.clone().normalize();
                this.targetCameraPosition.copy(direction.multiplyScalar(this.CAMERA_DISTANCE * this.ZOOM_FACTOR));

                // Démarrer l'animation
                this.startZoomAnimation(true);
            }
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

    private createRadialGradientTexture(centerColor: string, edgeColor: string): THREE.Texture {
        const size = 512; // Taille du canvas
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Impossible de créer un contexte 2D');

        // Dégradé radial
        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        gradient.addColorStop(0, centerColor);
        gradient.addColorStop(1, edgeColor);

        // Remplissage du canvas avec le dégradé
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        // Convertir le canvas en texture
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    closePanel(): void {
        this.selectedOcean = null;
        this.startZoomAnimation(false);
        this.isRotating = true;

        // Attendre la fin de l'animation de zoom avant de réactiver la rotation
        setTimeout(() => {
            this.isAnimating = false;
        }, this.ZOOM_DURATION - 2150); // On ajoute un petit délai pour être sûr
    }

    ngOnDestroy(): void {
        window.removeEventListener('resize', () => this.onWindowResize());
        document.removeEventListener('mousemove', (event) => this.onMouseMove(event));
        document.removeEventListener('click', (event) => this.onClick(event));
    }


}
