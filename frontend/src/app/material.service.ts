import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import material from '../models/material';
import id from '@angular/common/locales/id';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private BASE_URL = 'http://localhost:3000/api/materiales';

  constructor(private http: HttpClient) { }

  getMateriales() {
    return this.http.get<any>(`${this.BASE_URL}/`);
  }
  getAllDias() {
    return this.http.get<any>(`${this.BASE_URL}/dias/`);
  }

  getOneMaterial() {
    return this.http.get<void>(`${this.BASE_URL}/${id}`);
  }

  addMaterial() {
    return this.http.post<void>(`${this.BASE_URL}/`, "{ \"material\": " + JSON.stringify(material) + "}");
  }

  updateMaterial() {
    return this.http.put<void>(`${this.BASE_URL}/`, "{ \"material\": " + JSON.stringify(material) + "}");
  }
  
  deleteMaterial() {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
