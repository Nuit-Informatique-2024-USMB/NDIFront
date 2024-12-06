import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interfaces for your models
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
  private apiUrl = 'https://ndi-rapi.mathis-mazoyer.fr/oceans'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getOceans(): Observable<Ocean[]> {
    return this.http.get<Ocean[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getOceanByName(name: string): Observable<Ocean> {
    return this.http.get<Ocean>(`${this.apiUrl}/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log the error to the console
    return throwError(() => new Error('Something went wrong with the request. Please try again later.'));
  }
}