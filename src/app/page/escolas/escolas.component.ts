import { Component, OnInit } from '@angular/core';
import { Escola } from "../../shared/model/escola.interface";
import { EscolaService } from "../../shared/service/escola.service";
import { ConfirmationService, MessageService } from "primeng/api";
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MenuComponent} from "../../component/menu/menu.component";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {AvatarModule} from "primeng/avatar";
import {FilterEscolaPipe} from "../../shared/pipe/filter-escola.pipe";
import {DataViewModule} from "primeng/dataview";
import {DialogModule} from "primeng/dialog";
import {HeaderComponent} from "../../component/header/header.component";

@Component({
  selector: 'app-escolas',
  templateUrl: './escolas.component.html',
  imports: [
    ButtonModule,
    ChipsModule,
    FormsModule,
    NgIf,
    MenuComponent,
    ToastModule,
    ConfirmDialogModule,
    AvatarModule,
    FilterEscolaPipe,
    DataViewModule,
    DialogModule,
    HeaderComponent,
    NgForOf
  ],
  standalone: true,
  providers: [MessageService, ConfirmationService]
})
export class EscolasComponent implements OnInit {
  escolas: Escola[] = [];
  pesquisarEscolas: string = '';
  mostrarMensagemNenhumResultado: boolean = false;
  visible: boolean = false;

  novaEscola: Escola = {
    iCodEscola: 0,
    sDescricao: ''
  };

  constructor(private escolaService: EscolaService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getEscolas();
  }

  getEscolas(): void {
    this.escolaService.getEscolas().subscribe(escolas => {
      this.escolas = escolas;
    });
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
    this.escolaService.updateEscola(escola.iCodEscola, escola).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Escola atualizada com sucesso' });
    });
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
    this.escolaService.deleteEscola(escola.iCodEscola).subscribe(() => {
      this.escolas = this.escolas.filter(a => a.iCodEscola !== escola.iCodEscola);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Escola deletada com sucesso' });
    });
  }

  cadastrarEscolaDialog(): void {
    this.visible = true;
  }

  cadastrarEscola(): void {
    this.escolaService.addEscola(this.novaEscola).subscribe(() => {
      this.getEscolas(); // Atualiza a lista após adicionar a nova escola
      this.fecharDialog();
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Escola cadastrada com sucesso' });
    });
  }

  fecharDialog(): void {
    this.visible = false;
    this.novaEscola = {
      iCodEscola: 0,
      sDescricao: ''
    };
  }
}
