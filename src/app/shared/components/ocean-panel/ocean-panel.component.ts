// src/app/components/ocean-panel/ocean-panel.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Ocean} from "../../../core/models/oceans.model";

@Component({
    selector: 'app-ocean-panel',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="ocean-panel" *ngIf="ocean">
            <div class="panel-header">
                <h2>{{ ocean.name }}</h2>
                <button (click)="onClose()">×</button>
            </div>
            <div class="panel-content">
                <p>{{ ocean.info }}</p>
            </div>
        </div>
    `,
    styles: [`
        .ocean-panel {
            position: fixed;
            right: 0;
            top: 0;
            width: 300px;
            height: 100vh;
            background: rgba(255, 255, 255, 0.95);
            box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
            padding: 20px;
            z-index: 1000;
        }
        .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        button {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
        h2 {
            margin: 0;
        }
    `]
})
export class OceanPanelComponent {
    @Input() ocean: Ocean | null = null;
    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }
}
