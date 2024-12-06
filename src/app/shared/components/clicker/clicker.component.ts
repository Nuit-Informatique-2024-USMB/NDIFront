import { Component, OnDestroy, OnInit } from '@angular/core';
import { TypeUpgradeList } from '../../../core/models/clicker.model';
import { DecimalPipe, NgStyle } from '@angular/common';

@Component({
    selector: 'app-clicker',
    standalone: true,
    templateUrl: './clicker.component.html',
    imports: [DecimalPipe, NgStyle],
    styleUrl: './clicker.component.scss'
})
export class ClickerComponent implements OnInit, OnDestroy {
    protected Totalincome: number = 0;
    protected counter: number = 0;
    imagePosition = { top: '50%', left: '50%' };
    protected UpgradeList: TypeUpgradeList[] = [
        { ID: 1, Name: 'Pagaie', Cost: 25, Income: 0.1, ImgPath: 'assets/clicker_img/upgrade_pagaie.png', seuilAffiche: 0 },
        { ID: 2, Name: 'Moteur', Cost: 100, Income: -1, ImgPath: 'assets/clicker_img/upgrade_motor.png', seuilAffiche: 150 },
        { ID: 3, Name: 'Amélioration de la coque', Cost: 250, Income: 5, ImgPath: 'assets/clicker_img/upgrade_coque.png', seuilAffiche: 350 },
        { ID: 4, Name: 'Amélioration des voiles', Cost: 500, Income: 10, ImgPath: 'assets/clicker_img/upgrade_voile.png', seuilAffiche: 1200 },
        { ID: 5, Name: 'Filet de pêche', Cost: 1500, Income: -30, ImgPath: 'assets/clicker_img/upgrade_filet_peche.png', seuilAffiche: 3000 },
        { ID: 6, Name: 'Récupérateur de plastique', Cost: 2000, Income: 50, ImgPath: 'assets/clicker_img/upgrade_recuperateur_plastique.png', seuilAffiche: 6000 }
    ];
    private incomeInterval!: ReturnType<typeof setInterval>;

    protected onImageClick(): void {
        this.counter += 49000;
        const randomTop = Math.random() * 90 + '%';
        const randomLeft = Math.random() * 90 + '%';

        this.imagePosition = { top: randomTop, left: randomLeft };
        console.log(this.counter);
    }

    protected onUpgradeClick(ID: number): void {
        for (const upgrade of this.UpgradeList) {
            if (upgrade.ID === ID && this.counter >= upgrade.Cost) {
                this.Totalincome += upgrade.Income;
                this.counter -= upgrade.Cost;
                return;
            }
        }
        console.error(`Upgrade with ID ${ID} not found`);
    }

    ngOnInit(): void {
        this.shuffleUpgradeList(); // Mélange initial
        this.incomeInterval = setInterval(() => {
            this.shuffleUpgradeList(); // Mélange toutes les 5 secondes
            const randomTop = Math.random() * 90 + '%';
            const randomLeft = Math.random() * 90 + '%';

            this.imagePosition = { top: randomTop, left: randomLeft };
            this.counter += this.Totalincome;
        }, 1000);
    }

    ngOnDestroy(): void {
        if (this.incomeInterval) {
            clearInterval(this.incomeInterval);
        }
    }

    private shuffleUpgradeList(): void {
        this.UpgradeList.sort(() => Math.random() - 0.5);
    }

    protected readonly Math = Math;
}
