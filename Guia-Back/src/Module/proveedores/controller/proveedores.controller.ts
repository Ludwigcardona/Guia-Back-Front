import {
    Controller,
    Post,
    Body,
    Delete,
    Param,
    NotFoundException,
    Get,
    Put,
    Patch,
  } from '@nestjs/common';
  import { ProveedoresServices } from '../service/proveedores.service';
  import { CreateProveedoresDto } from '../dto/create-proveedores.dto';
  import { UpdateProveedoresDto } from '../dto/update-proveedores.dto';
  import { Proveedores } from '../schema/proveedores.schema';
  
  // Importación necesaria para documentar en swagger para los endpoints
  import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';


  @ApiTags('Proveedor') // Etiqueta para agrupar endpoints en la documentación
  @Controller('proveedores') // Ruta base
  export class ProveedoresController {

  constructor(private readonly proveedoresService: ProveedoresServices) 
  {
    
  } 

@Post()
@ApiOperation({summary: 'Crear un nuevo proveedor'})
@ApiResponse({status: 201, description: 'El proveedor ha sido creado'})
@ApiResponse({status: 400, description: 'Solicitud incorrecta'})
@ApiBody({
  description: 'Cuerpo de solicitud para crear un nuevo proveedor',
  examples: {
    example: {
      summary: 'Ejemplo de creación',
      value: {
        nombre_proveedor: 'Nombre_Proveedor',
        email_proveedor: 'proveedor@gmail.com',
        celular_proveedor: '1234567890'
      }
    }
  }
})

async create(@Body() createProveedorDto: CreateProveedoresDto): Promise<Proveedores>{
    return this.proveedoresService.createProveedor(createProveedorDto); 
 }

 @Put('deactivate/:id')
@ApiOperation({summary: 'Desactivar un proveedor'})
@ApiResponse({status: 204, description: 'Proveedor desactivado'})
@ApiResponse({status: 400, description: 'No se encuentra el proveedor'})
@ApiResponse({status: 404, description: 'Solicitud incorrecta'})
@ApiParam({
  name: 'id',
  required: true,
  description: 'Id del proveedor que desea desactivar',
  type: String,
})
async deactivate(@Param('id') id: string): Promise<void>{
  await this.proveedoresService.desactivate(id);
}

@Put('active/:id')
@ApiOperation({summary: 'Activar un proveedor'})
@ApiResponse({status: 204, description: 'Proveedor activado'})
@ApiResponse({status: 400, description: 'No se encuentra el proveedor'})
@ApiResponse({status: 404, description: 'Solicitud incorrecta'})
@ApiParam({
  name: 'id',
  required: true,
  description: 'Id del proveedor que desea activar',
  type: String,
})
async active(@Param('id') id: string): Promise<void>{
  await this.proveedoresService.active(id);
}

@Delete('delete/:id')
@ApiOperation({summary: 'Eliminar un proveedor'})
@ApiResponse({status: 204, description: 'Proveedor eliminado'})
@ApiResponse({status: 400, description: 'No se encuentra el proveedor'})
@ApiResponse({status: 404, description: 'Solicitud incorrecta'})
@ApiParam({
  name: 'id',
  required: true,
  description: 'Id del proveedor que desea eliminar',
  type: String,
})
async delete(@Param('id') id: string): Promise<void> {
  await this.proveedoresService.delete(id);
}

@Get()
@ApiOperation({summary: 'Obtener todos los proveedores'})
@ApiResponse({status: 200, description: 'Lista de proveedores', type: [Proveedores]})
@ApiResponse({status: 404, description: 'Paises no encontrados'})
async findAll(): Promise<Proveedores[]> {
  return await this.proveedoresService.findAll();
}

@Get(':id')
@ApiOperation({summary: 'Obtener un proveedor por su Id'})
@ApiResponse({status: 204, description: 'Proveedor encontrado'})
@ApiResponse({status: 400, description: 'No se encuentra el proveedor'})
@ApiResponse({status: 404, description: 'Solicitud incorrecta'})
@ApiParam({
  name: 'id',
  required: true,
  description: 'Id del proveedor que desea obtener',
  type: String,
})
async findOne(@Param('id') id: string): Promise<Proveedores> {
  return await this.proveedoresService.findOne(id);
}

@Put('update/:id')
@ApiOperation({summary: 'Actualizar de un proveedor'})
@ApiResponse({status: 201, description: 'El proveedor ha sido actualizado'})
@ApiResponse({status: 400, description: 'No se encuentra el proveedor'})
@ApiResponse({status: 404, description: 'Solicitud incorrecta'})
@ApiBody({
  description: 'Cuerpo de solicitud para actualizar un nuevo proveedor',
  examples: {
    example: {
      summary: 'Ejemplo de actualización',
      value: {
        nombre_proveedor: 'Proveedor_actualizado',
        email_proveedor: 'proveedorudpate@gmail.com',
        celular_proveedor: '1234567'
      }
    }
  }
})
async update(@Param('id') id: string, @Body() updateProveedoresDto: UpdateProveedoresDto): Promise<Proveedores> {
  const updateProveedor = await this.proveedoresService.update(id, updateProveedoresDto);

  if (!updateProveedor) {
    throw new NotFoundException(`Proveedor con Id ${id} no se encontró`);
  }

  return updateProveedor;
}

@Patch('updatePartial/:id')
@ApiOperation({summary: 'Actualizar de un proveedor parcialmente'})
@ApiResponse({status: 201, description: 'El proveedor ha sido actualizado'})
@ApiResponse({status: 400, description: 'No se encuentra el proveedor'})
@ApiResponse({status: 404, description: 'Solicitud incorrecta'})
@ApiBody({
  description: 'Cuerpo de solicitud para actualizar un nuevo proveedor',
  examples: {
    example: {
      summary: 'Ejemplo de actualización',
      value: {
        nombre_proveedor: 'Proveedor_actualizacionParcial',
        email_proveedor: 'proveedorudpateparcial@gmail.com',
        celular_proveedor: '12345674354'
      }
    }
  }
})
async updatePartial(@Param("id") id: string, @Body() updateProveedoresDto: UpdateProveedoresDto): Promise<Proveedores>{
  const updatePartialProveedor = await this.proveedoresService.updatePartial (id, updateProveedoresDto);

  if(!updatePartialProveedor) {
    throw new NotFoundException('Proveedor con Id ${id} no se encontro');
  }

  return updatePartialProveedor;
}
}
