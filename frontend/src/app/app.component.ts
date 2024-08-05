import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import material, { IMaterial } from '../models/material';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Material } from '../models/material.enum';
import { contarMaterial } from '../models/material';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CanvasJSAngularChartsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  chartOptions = {
    title: {
      text: "Objetos Tirados "
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Otro",  y: 10 },
        { label: "Metal", y: 30 },
        { label: "Papel", y: 25  },
        { label: "Carton",  y: 7  },
        { label: "Plastico",  y: 17  },
        { label: "Vidrio",  y: 4  },
        { label: "Comida",  y: 26  },
        { label: "Electronico",  y: 28  }
      ]
    }]                
  };
}