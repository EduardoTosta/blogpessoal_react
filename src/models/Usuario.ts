import type Postagem from "./Postagem";

export default interface Usuario {
  id: 0;
  nome: string;
  usuario: string;
  senha: string;
  foto: string;
  postagem?: Postagem[] | null;
}
