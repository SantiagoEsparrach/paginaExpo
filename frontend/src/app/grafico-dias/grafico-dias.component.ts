import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MaterialService } from '../material.service';  
import { Material } from '../../models/material.enum';
import { IMaterial } from '../../models/material';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

  @Component({
    selector: 'app-grafico',
    templateUrl: './grafico-dias.component.html',
    styleUrls: ['./grafico-dias.component.css']
  })
  export class GraficoDiasComponent implements OnInit, AfterViewInit {
  fechas: Material[] = [];
  chartOptions: any = {
    title: {
      text: "Distribución de Materiales de hoy"
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
    // Obtener datos y filtrar solo los del día actual
    this.materialService.getMateriales().subscribe(
      (data: IMaterial[]) => {
        // Filtramos los materiales por la fecha de hoy antes de generar los puntos
        const materialesDeHoy = data.filter(item => this.esHoy(item.tirado));
        this.chartOptions.data[0].dataPoints = this.generateDataPoints(materialesDeHoy);

        this.renderChart();
      },
      (error) => {
        console.error('Error fetching materials:', error);
      }
    );
  }

  // Genera los puntos del gráfico basándose en los materiales filtrados por día
  private generateDataPoints(data: IMaterial[]): any[] {
    return [
      { label: "Metal", y: this.contarMaterial(Material.Metal.toString(), data) },
      { label: "Papel", y: this.contarMaterial(Material.Papel.toString(), data) },
      { label: "Cartón", y: this.contarMaterial(Material.Carton.toString(), data) },
      { label: "Plástico", y: this.contarMaterial(Material.Plastico.toString(), data) },
      { label: "Vidrio", y: this.contarMaterial(Material.Vidrio.toString(), data) },
      { label: "Biológico", y: this.contarMaterial(Material.Comida.toString(), data) },
    ];
  }

  // Función que cuenta la cantidad de un material específico en los datos filtrados
  private contarMaterial(material: String, data: any[]): number {
    return data.filter(item => item.nombre === material.toString()).length;
  }

  // Verifica si la fecha de un material es el día de hoy
  private esHoy(fecha: Date): boolean {
    const hoy = new Date();
    const fechaMaterial = new Date(fecha);

    // Normalizar ambas fechas a medianoche
    hoy.setHours(0, 0, 0, 0);
    fechaMaterial.setHours(0, 0, 0, 0);

    return fechaMaterial.getTime() === hoy.getTime();
  } 

  navegarAHistorico() {
    this.router.navigate(['/historico']);
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
