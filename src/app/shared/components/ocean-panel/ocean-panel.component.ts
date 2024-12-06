import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ocean } from "../../../core/models/oceans.model";
import { QcmComponent } from "../qcm/qcm.component";

@Component({
  selector: 'app-ocean-panel',
  standalone: true,
  imports: [CommonModule, QcmComponent],
  templateUrl: './ocean-panel.component.html',
  styleUrls: ['./ocean-panel.component.scss']
})
export class OceanPanelComponent {
  @Input() ocean!: Ocean;
  @Output() close = new EventEmitter<void>();

  isActive = false;
  isClosing = false;

  onClose(): void {
    this.isClosing = true;
    this.isActive = false;
    setTimeout(() => {
      this.close.emit();
      this.isClosing = false;
    }, 600);
  }

  openPanel(oceanData: Ocean): void {
    this.ocean = oceanData;
    this.isActive = true;
    this.isClosing = false;
  }
}
