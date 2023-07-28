export interface IUsuario {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  __v: number;
  weddings: Wedding[];
  wedding: Wedding;
}

export interface Wedding {
  _id: string;
  tituloPagina: string;
  createdAt: string;
  __v: number;
  idUsuario: string;
}
