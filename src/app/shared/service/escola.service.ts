import { Injectable } from '@angular/core';
import {Escola} from "../model/escola.interface";

@Injectable({
  providedIn: 'root'
})
export class EscolaService {
  escolas: Escola[] = [
    {
      iCodEscola: 1,
      sDescricao: 'Descrição da escola 1'
    },
    {
      iCodEscola: 2,
      sDescricao: 'Descrição da escola 2'
    }
  ];

  constructor() { }

  getEscolas(): Escola[] {
    return this.escolas;
  }

  deleteEscola(iCodEscola: number) {

  }
}
