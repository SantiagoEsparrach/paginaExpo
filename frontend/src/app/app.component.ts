import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GraficoComponent } from './grafico/grafico.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppModule { 
  title = 'app';

}
