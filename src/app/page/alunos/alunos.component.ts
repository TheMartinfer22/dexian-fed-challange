import {Component, InjectionToken, OnInit} from '@angular/core';
import { Aluno } from "../../shared/model/aluno.interface";
import { AlunoService } from "../../shared/service/aluno.service";
import { ConfirmationService, MessageService } from "primeng/api";
import {MenuComponent} from "../../component/menu/menu.component";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {AvatarModule} from "primeng/avatar";
import {FilterAlunoPipe} from "../../shared/pipe/filter-aluno.pipe";
import {DataViewModule} from "primeng/dataview";
import {HeaderComponent} from "../../component/header/header.component";
import {NgxMaskDirective, NgxMaskService} from "ngx-mask";

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  imports: [
    MenuComponent,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    ChipsModule,
    NgIf,
    DatePipe,
    AvatarModule,
    FilterAlunoPipe,
    DataViewModule,
    HeaderComponent,
    NgForOf,
    NgxMaskDirective
  ],
  standalone: true,
  providers: [MessageService, ConfirmationService]
})
export class AlunosComponent implements OnInit {
  alunos: Aluno[] = [];
  pesquisarAlunos: string = '';
  mostrarMensagemNenhumResultado: boolean = false;
  visible: boolean = false;

  novoAluno: Aluno = {
    sNome: '',
    dNascimento: new Date(),
    scpf: '',
    sEndereco: '',
    sCelular: '',
    iCodEscola: 0
  };

  constructor(private alunosService: AlunoService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAlunos();
  }

  getAlunos(): void {
    this.alunosService.getAlunos().subscribe(alunos => {
      this.alunos = alunos;
      if (this.alunos.length == 0) {
        this.mostrarMensagemNenhumResultado = true;
      }
    });
  }

  verificarResultados(): void {
    this.mostrarMensagemNenhumResultado = this.alunos.filter(aluno =>
      aluno.scpf.toLowerCase().includes(this.pesquisarAlunos.toLowerCase()) ||
      aluno.sNome.toLowerCase().includes(this.pesquisarAlunos.toLowerCase())
    ).length === 0;
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
    if (aluno.iCodAluno) {
      this.alunosService.deleteAluno(aluno.iCodAluno).subscribe(() => {
        this.alunos = this.alunos.filter(a => a.iCodAluno !== aluno.iCodAluno);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno deletado com sucesso' });
      });
    }
  }

  editarAlunoDialog(aluno: Aluno) {
    this.novoAluno = {
      iCodAluno: aluno.iCodAluno,
      sNome: aluno.sNome,
      dNascimento: aluno.dNascimento,
      scpf: aluno.scpf,
      sEndereco: aluno.sEndereco,
      sCelular: aluno.sCelular,
      iCodEscola: aluno.iCodEscola
    };
    this.visible = true;
  }

  cadastrarAlunoDialog() {
    this.novoAluno = {
      iCodAluno: 0,
      sNome: '',
      dNascimento: new Date(),
      scpf: '',
      sEndereco: '',
      sCelular: '',
      iCodEscola: 0
    };
    this.visible = true;
  }

  salvarAluno(): void {
    if (this.novoAluno.iCodAluno !== 0 && this.novoAluno.iCodAluno) {
      this.alunosService.updateAluno(this.novoAluno.iCodAluno, this.novoAluno).subscribe(() => {
        this.getAlunos();
        this.fecharDialog();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno atualizado com sucesso' });
      });
    } else {
      this.alunosService.addAluno(this.novoAluno).subscribe(() => {
        this.getAlunos();
        this.fecharDialog();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno cadastrado com sucesso' });
      }, error => {
        let errorMessage = Object.values(error.error.errors)[0] as string;
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage  });
      });
    }
  }

  fecharDialog() {
    this.visible = false;
    this.novoAluno = {
      iCodAluno: 0,
      sNome: '',
      dNascimento: new Date(),
      scpf: '',
      sEndereco: '',
      sCelular: '',
      iCodEscola: 0
    };
  }
}
