import {AfterViewInit, Component} from '@angular/core';
import {Application, Assets, Sprite} from 'pixi.js'
import {Router} from "@angular/router";

@Component({
    selector: 'app-tir',
    imports: [],
    templateUrl: './tir.component.html',
    standalone: true,
    styleUrl: './tir.component.css'
})


export class TirComponent implements AfterViewInit {

    constructor(private router: Router) {
        if (this.isMobile()) {
            this.router.navigate(["/earth"]);
            return;
        }
    }

    private isMobile(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    async ngAfterViewInit() {
        // Create a new application
        const app = new Application();


        // Initialize the application
        await app.init({background: '#1099bb', resizeTo: window});

        // Append the application canvas to the document body
        document.body.appendChild(app.canvas);

        // Load the bunny texture
        const texture = await Assets.load('assets/pixi/cell.png');
        const texture_balle = await Assets.load("assets/pixi/balle.png")
        const cancer = await Assets.load('assets/pixi/cancer.png');
        const bg = await Assets.load('assets/pixi/bg.png');
        const bunny = new Sprite(cancer);
        const back = new Sprite(bg);
        back.scale.set(5, 5)

        app.stage.addChild(back)

        var liste_balle: Sprite[] = [];
        var liste_dir: number[] = [];

        var cellules: Sprite[] = []

        // Center the sprite's anchor point
        bunny.anchor.set(0.5);


        // Move the sprite to the center of the screen
        bunny.x = app.screen.width / 2;
        bunny.y = app.screen.height / 2;

        document.addEventListener('click', function (event) {
            const balle = new Sprite(texture_balle);
            balle.scale.set(0.5, 0.5)
            balle.anchor.set(0.5);
            balle.x = app.screen.width / 2;
            balle.y = app.screen.height / 2;
            app.stage.addChild(balle)
            liste_balle.push(balle)
            liste_dir.push(bunny.rotation)
            console.log(liste_dir)

        });

        app.stage.addChild(bunny);


        for (let i: number = 0; i < liste_balle.length; i++) {
            const ennemi = new Sprite(texture);

        }

        const circleRadius = 400


        function spawnCells() {
            for (let i: number = 0; i < 4; i++) {
                let fmin = i * 3.14 / 2 + 0.2
                let fmax = (i + 1) * 3.14 / 2 - 0.2
                let angle = fmin + Math.random() * (fmax - fmin)
                spawnCell(angle)

            }
        }

        function spawnCell(randangle: number) {
            const cell = new Sprite(texture);
            cell.anchor.set(0.5);

            cell.x = (Math.cos(randangle) * circleRadius) + app.screen.width / 2
            cell.y = (Math.sin(randangle) * circleRadius) + app.screen.height / 2
            app.stage.addChild(cell)
            cellules.push(cell)

        }

        spawnCells()


        // Listen for animate update
        app.ticker.add((time) => {
            bunny.rotation += 0.025 * time.deltaTime;
            let indexToDelete: number[] = []
            for (let i: number = 0; i < liste_balle.length; i++) {
                liste_balle[i].position.x += Math.cos(liste_dir[i]) * 20
                liste_balle[i].position.y += Math.sin(liste_dir[i]) * 20
                if ((liste_balle[i].position.x < 0 || liste_balle[i].position.x > screen.width) || (liste_balle[i].position.y < 0 || liste_balle[i].position.y > screen.height)) {
                    for (let y: number = 0; y < liste_balle.length; y++) {
                        app.stage.removeChild(liste_balle[y])
                    }
                    for (let y: number = 0; y < cellules.length; y++) {
                        app.stage.removeChild(cellules[y])
                    }
                    liste_balle = []
                    cellules = []
                    liste_dir = []
                    spawnCells()
                } else {
                    let indexToDeleteCellules: number[] = []
                    for (let j: number = 0; j < cellules.length; j++) {
                        const cellule = cellules[j]
                        if (distance(cellule.position.x, cellule.position.y, liste_balle[i].position.x, liste_balle[i].position.y) < 100) {
                            app.stage.removeChild(liste_balle[i])
                            app.stage.removeChild(cellules[j])
                            indexToDelete.push(i)
                            indexToDeleteCellules.push(j)
                        }
                    }
                    for (let j: number = 0; j < indexToDeleteCellules.length; j++) {
                        cellules.splice(indexToDeleteCellules[j], 1)
                    }
                }
            }
            for (let i: number = 0; i < indexToDelete.length; i++) {
                liste_balle.splice(indexToDelete[i], 1)
                liste_dir.splice(indexToDelete[i], 1)
            }

            if (cellules.length == 0) {
                this.router.navigate(["/earth"])
                document.body.removeChild(app.canvas);

            }

        });


    }
}

function onclick() {
    console.log("Cliqué")
}

function distance(x: number, y: number, x2: number, y2: number) {
    return Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2))
}
