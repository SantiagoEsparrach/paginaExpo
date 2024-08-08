import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GraficoComponent } from './grafico/grafico.component'; // Ajusta la ruta según tu estructura

@NgModule({
  declarations: [
    
    GraficoComponent
  ],
  imports: [RouterOutlet,InicioComponent,RouterLink,],
  providers: [],
  bootstrap: []
})
export class AppModule { }
