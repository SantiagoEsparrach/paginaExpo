import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // La URL de tu servidor de WebSocket
  }

  // Emitir un evento
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  // Escuchar eventos
  on(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  // Desconectar el socket cuando no se use
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
