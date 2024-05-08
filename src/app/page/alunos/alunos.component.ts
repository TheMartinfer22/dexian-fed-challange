import { Component, OnInit } from '@angular/core';
import {Aluno} from "../../shared/model/aluno.interface";
import {AlunoService} from "../../shared/service/aluno.service";
import {DataViewModule} from "primeng/dataview";
import {ButtonModule} from "primeng/button";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {AvatarModule} from "primeng/avatar";
import {MenuComponent} from "../../component/menu/menu.component";
import {HeaderComponent} from "../../component/header/header.component";
import {RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {FilterAlunoPipe} from "../../shared/pipe/filter-aluno.pipe";

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    DatePipe,
    NgForOf,
    AvatarModule,
    MenuComponent,
    HeaderComponent,
    RouterOutlet,
    FormsModule,
    InputTextModule,
    FilterAlunoPipe,
    NgIf
  ]})
export class AlunosComponent implements OnInit {
  alunos: Aluno[] = [];
  pesquisarAlunos!: string;
  public mostrarMensagemNenhumResultado = false;

  constructor(private alunosService: AlunoService) { }

  ngOnInit(): void {
    this.alunos = this.alunosService.getAlunos();
  }

  verificarResultados(): void {
    this.mostrarMensagemNenhumResultado = this.alunos.filter(aluno =>
      aluno.sCPF.toLowerCase().includes(this.pesquisarAlunos.toLowerCase()) ||
      aluno.sNome.toLowerCase().includes(this.pesquisarAlunos.toLowerCase())
    ).length === 0;
  }
}
