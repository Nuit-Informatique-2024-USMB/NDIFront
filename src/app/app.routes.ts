import { Routes } from '@angular/router';
import {EarthComponent} from "./shared/components/earth/earth.component";
import { ClickerComponent } from './shared/components/clicker/clicker.component';

export const routes: Routes = [
    {
        path: "earth", component: EarthComponent
    },
    {
        path:"clicker", component: ClickerComponent
    },
    {
        path: '', redirectTo: '/earth', pathMatch: 'full'
    }
];
