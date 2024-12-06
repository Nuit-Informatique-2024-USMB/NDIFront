import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Les interfaces adaptées de ton modèle
export interface Ocean {
  _id: string;
  name: string;
  position: {
    latitude: number;
    longitude: number;
  };
  info: string;
  QCM: QCM[];
  anecdotes: Anecdote[];
  createdAt: string;
  updatedAt: string;
}

export interface QCM {
  _id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  _id: string;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
}

export interface Anecdote {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  sources: string[];
}

@Injectable({
  providedIn: 'root'
})
export class OceanService {

  private apiUrl = 'https://ndi-rapi.mathis-mazoyer.fr/oceans'; // Remplace par l'URL de ton API

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
