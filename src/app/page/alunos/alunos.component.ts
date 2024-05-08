import { Component, OnInit } from '@angular/core';
import { Aluno } from "../../shared/model/aluno.interface";
import { AlunoService } from "../../shared/service/aluno.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  standalone: true,
  styleUrls: ['./alunos.component.css']
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
    this.getAlunos();
  }

  getAlunos(): void {
    this.alunosService.getAlunos().subscribe(alunos => {
      this.alunos = alunos;
    });
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
    this.alunosService.updateAluno(aluno.iCodAluno, aluno).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno atualizado com sucesso' });
    });
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
    this.alunosService.deleteAluno(aluno.iCodAluno).subscribe(() => {
      this.alunos = this.alunos.filter(a => a.iCodAluno !== aluno.iCodAluno);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno deletado com sucesso' });
    });
  }

  cadastrarAlunoDialog() {
    this.visible = true;
  }

  cadastrarAluno(): void {
    this.alunosService.addAluno(this.novoAluno).subscribe(() => {
      this.getAlunos(); // Atualiza a lista após adicionar o novo aluno
      this.fecharDialog();
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno cadastrado com sucesso' });
    });
  }

  fecharDialog() {
    this.visible = false;
    this.novoAluno = {
      iCodAluno: 0,
      sNome: '',
      dNascimento: new Date(),
      sCPF: '',
      sEndereco: '',
      sCelular: '',
      iCodEscola: 0
    };
  }
}
