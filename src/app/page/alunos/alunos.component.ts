import {Component, OnInit, WritableSignal} from '@angular/core';
import { Aluno } from "../../shared/model/aluno.interface";
import { AlunoService } from "../../shared/service/aluno.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {AvatarModule} from "primeng/avatar";
import {DataViewModule} from "primeng/dataview";
import {HeaderComponent} from "../../component/header/header.component";
import {FilterAlunoPipe} from "../../shared/pipe/filter-aluno.pipe";
import {MenuComponent} from "../../component/menu/menu.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import {ChipsModule} from "primeng/chips";

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ButtonModule,
    AvatarModule,
    DataViewModule,
    HeaderComponent,
    NgForOf,
    DatePipe,
    FilterAlunoPipe,
    MenuComponent,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    ChipsModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class AlunosComponent implements OnInit {
  alunos: Aluno[] = [];
  pesquisarAlunos: string = '';
  mostrarMensagemNenhumResultado: boolean = false;
  visible: boolean = false;

  novoAluno: Aluno = {
    iCodAluno: 0,
    sNome: '',
    dNascimento: new Date(),
    sCPF: '',
    sEndereco: '',
    sCelular: '',
    iCodEscola: 0
  };

  constructor(private alunosService: AlunoService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.alunos = this.alunosService.getAlunos();
  }

  verificarResultados(): void {
    this.mostrarMensagemNenhumResultado = this.alunos.filter(aluno =>
      aluno.sCPF.toLowerCase().includes(this.pesquisarAlunos.toLowerCase()) ||
      aluno.sNome.toLowerCase().includes(this.pesquisarAlunos.toLowerCase())
    ).length === 0;
  }

  editarAluno(aluno: Aluno): void {
    aluno.editando = true;
  }

  cancelarEdicao(aluno: Aluno): void {
    aluno.editando = false;
  }

  salvarAluno(aluno: Aluno): void {
    aluno.editando = false;
  }

  deleteAlunoConfirm($event: MouseEvent, aluno: Aluno) {
    const eventTarget = $event.target;
    if (eventTarget) {
      this.confirmationService.confirm({
        target: eventTarget as EventTarget,
        message: 'Tem certeza de que deseja prosseguir?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "pi pi-check",
        rejectIcon: "pi pi-times",
        rejectButtonStyleClass: "pt-2 pb-2 pe-4 ps-4 bg-red-300 me-2",
        acceptButtonStyleClass: "pt-2 pb-2 pe-4 ps-4 bg-green-300 me-2",
        accept: () => {
          this.deleteAluno(aluno);
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejeitado', detail: 'Você rejeitou', life: 3000 });
        }
      });
    }
  }

  deleteAluno(aluno: Aluno): void {
    this.alunosService.deleteAluno(aluno.iCodAluno);
    this.alunos = this.alunos.filter(a => a.iCodAluno !== aluno.iCodAluno);
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno deletado com sucesso' });
  }

  cadastrarAlunoDialog() {
    this.visible = true;
  }

  cadastrarAluno(): void {
    this.alunos.push(this.novoAluno)
    this.fecharDialog();
  }

  fecharDialog() {
    this.visible = false;
  }
}
