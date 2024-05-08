import { Pipe, PipeTransform } from '@angular/core';
import {Escola} from "../model/escola.interface";
import {Aluno} from "../model/aluno.interface";

@Pipe({
  name: 'filterAluno',
  standalone: true,
})
export class FilterAlunoPipe implements PipeTransform {
  transform(alunos: Aluno[] | null, search: string): Aluno[] | null {
    if (!alunos || !search) {
      return alunos;
    }

    search = search.toLowerCase();

    return alunos.filter(aluno =>
      aluno.scpf.toLowerCase().includes(search) ||
      aluno.sNome.toLowerCase().includes(search)
    );
  }
}
