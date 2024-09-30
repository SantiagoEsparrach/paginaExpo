import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MaterialService } from '../material.service';  
import { Material } from '../../models/material.enum';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit, AfterViewInit {
  fechas: Material[] = [];
  chartOptions: any = {
    title: {
      text: "Distribución de Materiales (Historico)"
    },
    data: [{
      type: "column",
      dataPoints: [] // Inicialmente vacío
    }]
  };

  constructor(private materialService: MaterialService, private router: Router) {}

  ngOnInit() {
    this.obtenerDatos();
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  obtenerDatos() {
    this.materialService.getAllDias().subscribe(
      (data: Material[]) => {
        this.fechas = data;
        console.log('Fechas:', this.fechas);
      },
      (error) => {
        console.error('Error fetching materials:', error);
      }
    );
    this.materialService.getMateriales().subscribe(
      (data: Material[]) => {
        this.chartOptions.data[0].dataPoints = this.generateDataPoints(data);

        this.renderChart();
      },
      (error) => {
        console.error('Error fetching materials:', error);
      }
    );
  }

  private generateDataPoints(data: Material[]): any[] {
    return [
      { label: "Otro", y: this.contarMaterial(Material.Otro.toString(), data) },
      { label: "Metal", y: this.contarMaterial(Material.Metal.toString(), data) },
      { label: "Papel", y: this.contarMaterial(Material.Papel.toString(), data) },
      { label: "Cartón", y: this.contarMaterial(Material.Carton.toString(), data) },
      { label: "Plástico", y: this.contarMaterial(Material.Plastico.toString(), data) },
      { label: "Vidrio", y: this.contarMaterial(Material.Vidrio.toString(), data) },
      { label: "Comida", y: this.contarMaterial(Material.Comida.toString(), data) },
      { label: "Electrónico", y: this.contarMaterial(Material.Electronico.toString(), data) }
    ];
  }

  private generarGraficoDias(){
    
  }

  private contarMaterial(material: String, data: any[]): number {
    const fecha= new Date();
    
    return data.filter(item => item.nombre === material.toString()  ).length;
  }

  navegarADia() {
    this.router.navigate(['/dia']);
  }
  navegarASemana() {
    this.router.navigate(['/semana']);
  }


  private renderChart() {
    if (typeof window !== 'undefined') {
      const chartContainer = document.getElementById('chartContainer');
      if (chartContainer) {
        const chart = new (window as any).CanvasJS.Chart(chartContainer, this.chartOptions);
        chart.render();
      }
    }
  }
}
