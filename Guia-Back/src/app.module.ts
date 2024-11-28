import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProveedoresModule } from './module/proveedores/proveedores.module';
import { ClientesModule } from './module/clientes/cliente.module';
import { ProductosModule } from './module/productos/productos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/j'),
    ProveedoresModule,
    ClientesModule,
    ProductosModule,
  ],
})
export class AppModule { }  