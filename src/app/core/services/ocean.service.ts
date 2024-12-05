import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ocean {
  name: string;
  position: {
    latitude: number;
    longitude: number;
  };
  info: string;
  QCM: {
    title: string;
    questions: string[];
    answers: string[];
    correctAnswerIndex: number;
  }[];
  anecdotes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class OceanService {

  private apiUrl = 'https://ndi-rapi.mathis-mazoyer.fr/'; // Remplace par l'URL de ton API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les océans depuis l'API
  getOceans(): Observable<Ocean[]> {
    return this.http.get<Ocean[]>(this.apiUrl);
  }

  // Méthode pour récupérer un océan spécifique par son nom
  getOceanByName(name: string): Observable<Ocean> {
    return this.http.get<Ocean>(`${this.apiUrl}/${name}`);
  }
}
