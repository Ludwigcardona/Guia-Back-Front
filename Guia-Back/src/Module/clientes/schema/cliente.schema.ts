import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Productos } from 'src/module/productos/schema/productos.schema';

@Schema()
export class Clientes extends Document {
  @Prop({ required: true })
  nombre_cliente: string;

  @Prop({ required: true })
  correo: string;

  @Prop()
  telefono: string;

  @Prop()
  direccion: string;

  // Lista de productos relacionados con el cliente
  @Prop({ type: [String], ref: 'Productos' })
  productos: string[];

  @Prop({ default: true })
  activo: boolean;
}

export const ClienteSchema = SchemaFactory.createForClass(Clientes);
