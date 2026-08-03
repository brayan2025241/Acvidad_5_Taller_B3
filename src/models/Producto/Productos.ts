import { Categoria } from "./Categoria";

export interface Producto {
  idProducto: number;
  nombreProducto: string;
  precio: number;
  stock: number;
  categoria: Categoria;
}

