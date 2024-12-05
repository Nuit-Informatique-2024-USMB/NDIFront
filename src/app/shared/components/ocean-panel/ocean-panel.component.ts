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

  // Fonction de fermeture
  onClose(): void {
    this.close.emit();
  }
}
