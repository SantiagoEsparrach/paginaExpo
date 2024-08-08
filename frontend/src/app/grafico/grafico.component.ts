import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MaterialService } from '../material.service';  
import { Material } from '../models/material.enum';  

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit, AfterViewInit {
  chartOptions: any = {
    title: {
      text: "Distribución de Materiales"
    },
    data: [{
      type: "column",
      dataPoints: [] // Inicialmente vacío
    }]
  };

  constructor(private materialService: MaterialService) {}

  ngOnInit() {
    this.obtenerDatos();
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  obtenerDatos() {
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
      { label: "Otro", y: this.contarMaterial(Material.Otro, data) },
      { label: "Metal", y: this.contarMaterial(Material.Metal, data) },
      { label: "Papel", y: this.contarMaterial(Material.Papel, data) },
      { label: "Cartón", y: this.contarMaterial(Material.Carton, data) },
      { label: "Plástico", y: this.contarMaterial(Material.Plastico, data) },
      { label: "Vidrio", y: this.contarMaterial(Material.Vidrio, data) },
      { label: "Comida", y: this.contarMaterial(Material.Comida, data) },
      { label: "Electrónico", y: this.contarMaterial(Material.Electronico, data) }
    ];
  }

  private contarMaterial(material: Material, data: Material[]): number {
    return data.filter(item => item.nombre === material).length;
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
