export interface Aluno {
  iCodAluno: number;
  sNome: string;
  dNascimento: Date;
  scpf: string;
  sEndereco: string;
  sCelular: string;
  iCodEscola: number;
  editando?: boolean;
}
