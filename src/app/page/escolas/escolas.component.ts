import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../component/menu/menu.component";
import {HeaderComponent} from "../../component/header/header.component";
import {RouterOutlet} from "@angular/router";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {SharedModule} from "primeng/api";
import {Aluno} from "../../shared/model/aluno.interface";
import {AlunoService} from "../../shared/service/aluno.service";
import {EscolaService} from "../../shared/service/escola.service";
import {Escola} from "../../shared/model/escola.interface";
import {FormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {FilterEscolaPipe} from "../../shared/pipe/filter-escola.pipe";

@Component({
  selector: 'app-escolas',
  standalone: true,
  imports: [
    MenuComponent,
    HeaderComponent,
    RouterOutlet,
    AvatarModule,
    ButtonModule,
    DataViewModule,
    DatePipe,
    NgForOf,
    SharedModule,
    FormsModule,
    ChipsModule,
    FilterEscolaPipe,
    NgIf
  ],
  templateUrl: './escolas.component.html'})
export class EscolasComponent implements OnInit {
  escolas: Escola[] = [];
  pesquisarEscolas!: string;
  mostrarMensagemNenhumResultado = false;

  constructor(private escolaService: EscolaService) { }

  ngOnInit(): void {
    this.escolas = this.escolaService.getEscolas();
  }

  verificarResultados(): void {
    this.mostrarMensagemNenhumResultado = this.escolas.filter(escola =>
      escola.sDescricao.toLowerCase().includes(this.pesquisarEscolas.toLowerCase())
    ).length === 0;
  }
}
