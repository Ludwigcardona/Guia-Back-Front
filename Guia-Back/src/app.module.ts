import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProveedoresModule } from './module/proveedores/proveedores.module';
import { ClientesModule } from './module/clientes/cliente.module';
import { ProductosModule } from './module/productos/productos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ludwigcardona29:7VzmvhNCAAxrKxIf@cluster0.epo6e.mongodb.net/Guia#1?retryWrites=true&w=majority&appName=cluster0'),
    ProveedoresModule,
    ClientesModule,
    ProductosModule,
  ],
})
export class AppModule {}