import { Clientes } from "./Clientes.type";
import { Proveedores } from "./Proovedor.type";

export interface Productos {
  _id: string;
  nombre_producto: string;
  cantidad: number;
  precio: number;
  proveedor: Proveedores[]; // Ajusta según tus necesidades
  cliente: Clientes[]; // Ajusta según tus necesidades
  activo?: boolean; // Para saber si el producto está activo
}