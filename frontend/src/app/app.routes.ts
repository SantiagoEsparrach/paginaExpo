import { Routes } from '@angular/router';
import { GraficoComponent } from './grafico/grafico.component';
import { GraficoSemanalComponent } from './grafico-semanal/grafico-semanal.component';
import { GraficoDiasComponent } from './grafico-dias/grafico-dias.component';

export const routes: Routes = [
    {
        path: '',
        component: GraficoComponent,
        title: 'Grafico'
    },
    {
        path: 'dia',
        component: GraficoDiasComponent,
        title: 'GraficoDia'
    },
    {
        path: 'semana',
        component: GraficoSemanalComponent,
        title: 'GraficoSemana'
    }
];
