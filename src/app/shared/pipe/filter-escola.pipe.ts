import { Pipe, PipeTransform } from '@angular/core';
import {Escola} from "../model/escola.interface";

@Pipe({
  name: 'filterEscola',
  standalone: true
})
export class FilterEscolaPipe implements PipeTransform {

  transform(escolas: Escola[] | null, descricao: string): Escola[] | null {
    if (!escolas || !descricao) {
      return escolas;
    }
    return escolas.filter(escola =>
      escola.sDescricao.toLowerCase().includes(descricao.toLowerCase())
    );
  }
}
