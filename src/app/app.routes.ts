import { Routes } from '@angular/router';
import {LoginComponent} from "./page/login/login.component";
import {AlunosComponent} from "./page/alunos/alunos.component";
import {EscolasComponent} from "./page/escolas/escolas.component";

export const routes: Routes = [
  {
    title: "Login | DexianChallange",
    path: "",
    component: LoginComponent
  },
  {
    title: "Alunos | DexianChallange",
    path: "alunos",
    // canActivate: [TokenCheckGuard],
    component: AlunosComponent
  },
  {
    title: "Escolas | DexianChallange",
    path: "escolas",
    // canActivate: [TokenCheckGuard],
    component: EscolasComponent
  }
];
