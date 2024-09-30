import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MaterialService } from '../material.service';  
import { Material } from '../../models/material.enum';
import { IMaterial } from '../../models/material';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico-semanal.component.html',
  styleUrls: ['./grafico-semanal.component.css']
})
export class GraficoSemanalComponent implements OnInit, AfterViewInit {
  fechas: Material[] = [];
  chartOptions: any = {
    title: {
      text: "Distribución de Materiales (Esta Semana)"
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
    // Obtener datos y filtrar solo los de la semana actual
    this.materialService.getMateriales().subscribe(
      (data: IMaterial[]) => {
        // Filtramos los materiales por la fecha de esta semana usando el campo "tirado"
        const materialesDeEstaSemana = data.filter(item => this.esEstaSemana(item.tirado));
        this.chartOptions.data[0].dataPoints = this.generateDataPoints(materialesDeEstaSemana);

        this.renderChart();
      },
      (error) => {
        console.error('Error fetching materials:', error);
      }
    );
  }

  // Genera los puntos del gráfico basándose en los materiales filtrados por la semana actual
  private generateDataPoints(data: IMaterial[]): any[] {
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

  // Función que cuenta la cantidad de un material específico en los datos filtrados
  private contarMaterial(material: String, data: any[]): number {
    return data.filter(item => item.nombre === material.toString()).length;
  }

  // Verifica si la fecha de "tirado" del material pertenece a esta semana
  private esEstaSemana(tirado: Date): boolean {
    const hoy = new Date();
    const fechaTirado = new Date(tirado);

    // Obtener el primer día de la semana (lunes)
    const primerDiaSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + (hoy.getDay() === 0 ? -6 : 1))); // Si es domingo, restamos más

    // Obtener el último día de la semana (domingo)
    const ultimoDiaSemana = new Date(primerDiaSemana);
    ultimoDiaSemana.setDate(primerDiaSemana.getDate() + 6);

    // Comprobar si la fecha de tirado está entre el lunes y domingo de esta semana
    return fechaTirado >= primerDiaSemana && fechaTirado <= ultimoDiaSemana;
  }

navegarAHistorico() {
  this.router.navigate(['/historico']);
}

navegarADia() {
  this.router.navigate(['/dia']);
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
