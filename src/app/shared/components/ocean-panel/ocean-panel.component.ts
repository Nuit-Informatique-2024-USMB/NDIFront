import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ocean } from "../../../core/models/oceans.model";

@Component({
  selector: 'app-ocean-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ocean-panel.component.html',
  styleUrls: ['./ocean-panel.component.scss']
})
export class OceanPanelComponent {
  @Input() ocean: Ocean | null = null;
  @Output() close = new EventEmitter<void>();

  isActive = false; // Panel state
  isClosing = false; // To trigger closing animation

  // Function to close the panel
  onClose(): void {
    this.isClosing = true; // Start the closing animation
    setTimeout(() => {
      this.close.emit(); // Emit close event after the animation completes
    }, 500); // Wait for the animation duration before emitting the event
  }

  // Function to open the panel
  openPanel(oceanData: any) {
    this.ocean = oceanData;
    this.isActive = true; // Trigger the opening animation
    this.isClosing = false; // Ensure closing state is reset
  }
}
