import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Escola } from '../model/escola.interface';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {
  apiUrl = 'http://localhost:8080/api/v1/escolas';

  constructor(private http: HttpClient) { }

  getEscolas(): Observable<Escola[]> {
    return this.http.get<Escola[]>(this.apiUrl);
  }

  getEscolaById(id: number): Observable<Escola> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Escola>(url);
  }

  addEscola(escola: Escola): Observable<Escola> {
    return this.http.post<Escola>(this.apiUrl, escola);
  }

  updateEscola(id: number, escola: Escola): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, escola);
  }

  deleteEscola(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
