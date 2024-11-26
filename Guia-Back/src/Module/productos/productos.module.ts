import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosController } from './controllers/productos.controllers';
import { Productos, ProductoSchema } from './schema/productos.schema';
import { ProveedoresModule } from '../proveedores/proveedores.module';
import { ClientesModule } from '../clientes/cliente.module';
import { ProductosServices } from './service/productos.services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Productos.name, schema: ProductoSchema }]),
    ProveedoresModule,
    ClientesModule,
  ],
  controllers: [ProductosController],
  providers: [ProductosServices],
  // exports: [ProductosServices]
})
export class ProductosModule {}