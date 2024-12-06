import { Routes } from '@angular/router';
import {EarthComponent} from "./shared/components/earth/earth.component";
import { ClickerComponent } from './shared/components/clicker/clicker.component';
import {TirComponent} from "./tir/tir.component";

export const routes: Routes = [
    {
        path: "earth", component: EarthComponent
    },
    {
        path:"clicker", component: ClickerComponent
    },
    {
        path: 'tir', component: TirComponent
    },
    {
        path: '', redirectTo: '/tir', pathMatch: 'full'
    }
];
