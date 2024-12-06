import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ocean } from "../../../core/models/oceans.model";
import { QcmComponent } from "../qcm/qcm.component"; // Assurez-vous que ce composant est bien importé

@Component({
  selector: 'app-ocean-panel',
  standalone: true, // Utilisation d'un composant autonome
  imports: [CommonModule, QcmComponent], // Ajout de QcmComponent ici pour l'importation
  templateUrl: './ocean-panel.component.html',
  styleUrls: ['./ocean-panel.component.scss']
})
export class OceanPanelComponent {
  @Input() ocean: Ocean | null = null; // Données pour l'océan, passé depuis le parent
  @Output() close = new EventEmitter<void>(); // EventEmitter pour fermer le panel

  isActive = false; // Etat du panel (ouvert/fermé)
  isClosing = false; // Etat de l'animation de fermeture

  // Fonction pour fermer le panel
  onClose(): void {
    this.isClosing = true; // Démarre l'animation de fermeture
    this.isActive = false; // Définit l'état à inactif
    setTimeout(() => {
      this.close.emit(); // Émet l'événement de fermeture après l'animation
      this.isClosing = false; // Réinitialise l'animation de fermeture
    }, 600); // Durée de l'animation avant l'émission de l'événement
  }

  // Fonction pour ouvrir le panel
  openPanel(oceanData: Ocean): void {
    this.ocean = oceanData; // Définit les données de l'océan
    this.isActive = true; // Active l'animation d'ouverture
    this.isClosing = false; // Réinitialise l'état de fermeture
  }
}
