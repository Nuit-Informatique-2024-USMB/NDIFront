import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Ocean } from "../../../core/models/oceans.model";

@Component({
  selector: 'app-ocean-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ocean-panel.component.html',
  styleUrls: ['./ocean-panel.component.scss'],
  animations: [
    // Define animations for open/close
    trigger('panelAnimation', [
      state('active', style({
        opacity: 1,
        transform: 'translateX(0)' // When active, the panel is in its normal position
      })),
      state('inactive', style({
        opacity: 0,
        transform: 'translateX(100%)' // When inactive, move the panel to the right (off-screen)
      })),
      transition('inactive => active', [
        animate('0.3s ease-out') // Animate when opening
      ]),
      transition('active => inactive', [
        animate('0.3s ease-in') // Animate when closing towards the right
      ])
    ])
  ]
})
export class OceanPanelComponent {
  @Input() ocean: Ocean | null = null;
  @Output() close = new EventEmitter<void>();

  // Panel visibility state
  isActive = false;

  // Function to close the panel
  onClose(): void {
    this.isActive = false; // Trigger the close animation
    setTimeout(() => {
      this.close.emit(); // Emit the close event after the animation
    }, 300); // Match the animation duration (in ms)
  }

  openPanel(oceanData: any) {
    this.ocean = oceanData;
    this.isActive = true; // Trigger the open animation
  }
}
