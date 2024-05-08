import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../model/aluno.interface';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  apiUrl = 'http://localhost:5290/api/v1/alunos';

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  getAlunoById(id: number): Observable<Aluno> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Aluno>(url);
  }

  addAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  updateAluno(id: number, aluno: Aluno): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, aluno);
  }

  deleteAluno(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
