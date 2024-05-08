import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../component/menu/menu.component";
import {HeaderComponent} from "../../component/header/header.component";
import {RouterOutlet} from "@angular/router";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {EscolaService} from "../../shared/service/escola.service";
import {Escola} from "../../shared/model/escola.interface";
import {FormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {FilterEscolaPipe} from "../../shared/pipe/filter-escola.pipe";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";

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
    NgIf,
    ConfirmDialogModule,
    ToastModule,
    DialogModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './escolas.component.html'})
export class EscolasComponent implements OnInit {
  escolas: Escola[] = [];
  pesquisarEscolas!: string;
  mostrarMensagemNenhumResultado = false;

  novaEscola: Escola = {
    iCodEscola: 0,
    sDescricao: ''
  }
  visible = false;

  constructor(private escolaService: EscolaService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.escolas = this.escolaService.getEscolas();
  }

  verificarResultados(): void {
    this.mostrarMensagemNenhumResultado = this.escolas.filter(escola =>
      escola.sDescricao.toLowerCase().includes(this.pesquisarEscolas.toLowerCase())
    ).length === 0;
  }
  editarEscola(escola: Escola): void {
    escola.editando = true;
  }

  cancelarEdicao(escola: Escola): void {
    escola.editando = false;
  }

  salvarEscola(escola: Escola): void {
    escola.editando = false;
  }

  deleteEscolaConfirm($event: MouseEvent, escola: Escola): void {
    const eventTarget = $event.target;
    if (eventTarget) {
      this.confirmationService.confirm({
        target: eventTarget as EventTarget,
        message: 'Tem certeza de que deseja prosseguir?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        rejectButtonStyleClass: 'pt-2 pb-2 pe-4 ps-4 bg-red-300 me-2',
        acceptButtonStyleClass: 'pt-2 pb-2 pe-4 ps-4 bg-green-300 me-2',
        accept: () => {
          this.deleteEscola(escola);
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejeitado', detail: 'Você rejeitou', life: 3000 });
        }
      });
    }
  }

  deleteEscola(escola: Escola): void {
    this.escolaService.deleteEscola(escola.iCodEscola);
    this.escolas = this.escolas.filter(a => a.iCodEscola !== escola.iCodEscola);
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Escola deletada com sucesso' });
  }

  cadastrarEscolaDialog() {
    this.visible = true;
  }

  cadastrarEscola() {
    this.escolas.push(this.novaEscola)
    this.fecharDialog();
  }

  fecharDialog() {
    this.visible = false;
  }
}
