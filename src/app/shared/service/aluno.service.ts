import { Injectable } from '@angular/core';
import {Aluno} from "../model/aluno.interface";

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  alunos: Aluno[] = [
    { iCodAluno: 1, sNome: 'João', dNascimento: new Date('1990-01-01'), sCPF: '123.456.789-00', sEndereco: 'Rua A, 123', sCelular: '(99) 99999-9999', iCodEscola: 1 },
    { iCodAluno: 2, sNome: 'Maria', dNascimento: new Date('1995-05-05'), sCPF: '987.654.321-00', sEndereco: 'Rua B, 456', sCelular: '(88) 88888-8888', iCodEscola: 2 },
  ];

  constructor() { }

  getAlunos(): Aluno[] {
    return this.alunos;
  }

  deleteAluno(iCodAluno: number) {

  }
}
