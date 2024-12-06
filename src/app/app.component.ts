import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClickerComponent } from './shared/components/clicker/clicker.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ClickerComponent],
    templateUrl: './app.component.html',
    styles: ``
})
export class AppComponent {
    title = 'NDIFront';
}
