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
  import { ClientesService } from '../service/clientes.service';
  import { CreateClienteDto } from '../dto/create-cliente.dto';
  import { UpdateClienteDto } from '../dto/update-cliente.dto';
  import { Clientes } from '../schema/cliente.schema';
  
  // Importación necesaria para documentar en swagger para los endpoints
  import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
  
  @ApiTags('Cliente') // Etiqueta para agrupar endpoints en la documentación
  @Controller('clientes') // Ruta base
  export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo cliente' })
    @ApiResponse({ status: 201, description: 'El cliente ha sido creado' })
    @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
    @ApiBody({
      description: 'Cuerpo de solicitud para crear un nuevo cliente',
      examples: {
        example: {
          summary: 'Ejemplo de creación',
          value: {
            nombre_cliente: 'Nombre_Cliente',
            correo_cliente: 'cliente@gmail.com',
            telefono_cliente: '1234567890',
          },
        },
      },
    })
    async create(@Body() createClienteDto: CreateClienteDto): Promise<Clientes> {
      return this.clientesService.createCliente(createClienteDto);
    }
  
    @Put('deactivate/:id')
    @ApiOperation({ summary: 'Desactivar un cliente' })
    @ApiResponse({ status: 204, description: 'Cliente desactivado' })
    @ApiResponse({ status: 400, description: 'No se encuentra el cliente' })
    @ApiResponse({ status: 404, description: 'Solicitud incorrecta' })
    @ApiParam({
      name: 'id',
      required: true,
      description: 'Id del cliente que desea desactivar',
      type: String,
    })
    async desactivate(@Param('id') id: string): Promise<void> {
      await this.clientesService.deactivate(id);
    }
  
    @Put('active/:id')
    @ApiOperation({ summary: 'Activar un cliente' })
    @ApiResponse({ status: 204, description: 'Cliente activado' })
    @ApiResponse({ status: 400, description: 'No se encuentra el cliente' })
    @ApiResponse({ status: 404, description: 'Solicitud incorrecta' })
    @ApiParam({
      name: 'id',
      required: true,
      description: 'Id del cliente que desea activar',
      type: String,
    })
    async active(@Param('id') id: string): Promise<void> {
      await this.clientesService.activate(id);
    }
  
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Eliminar un cliente' })
    @ApiResponse({ status: 204, description: 'Cliente eliminado' })
    @ApiResponse({ status: 400, description: 'No se encuentra el cliente' })
    @ApiResponse({ status: 404, description: 'Solicitud incorrecta' })
    @ApiParam({
      name: 'id',
      required: true,
      description: 'Id del cliente que desea eliminar',
      type: String,
    })
    async delete(@Param('id') id: string): Promise<void> {
      await this.clientesService.delete(id);
    }
  
    @Get()
    @ApiOperation({ summary: 'Obtener todos los clientes' })
    @ApiResponse({ status: 200, description: 'Lista de clientes', type: [Clientes] })
    @ApiResponse({ status: 404, description: 'Clientes no encontrados' })
    async findAll(): Promise<Clientes[]> {
      return await this.clientesService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un cliente por su Id' })
    @ApiResponse({ status: 204, description: 'Cliente encontrado' })
    @ApiResponse({ status: 400, description: 'No se encuentra el cliente' })
    @ApiResponse({ status: 404, description: 'Solicitud incorrecta' })
    @ApiParam({
      name: 'id',
      required: true,
      description: 'Id del cliente que desea obtener',
      type: String,
    })
    async findOne(@Param('id') id: string): Promise<Clientes> {
      return await this.clientesService.findOne(id);
    }
  
    @Put('update/:id')
    @ApiOperation({ summary: 'Actualizar un cliente' })
    @ApiResponse({ status: 201, description: 'El cliente ha sido actualizado' })
    @ApiResponse({ status: 400, description: 'No se encuentra el cliente' })
    @ApiResponse({ status: 404, description: 'Solicitud incorrecta' })
    @ApiBody({
      description: 'Cuerpo de solicitud para actualizar un cliente',
      examples: {
        example: {
          summary: 'Ejemplo de actualización',
          value: {
            nombre_cliente: 'Cliente_actualizado',
            correo_cliente: 'clienteudpate@gmail.com',
            telefono_cliente: '1234567',
          },
        },
      },
    })
    async update(
      @Param('id') id: string,
      @Body() updateClienteDto: UpdateClienteDto,
    ): Promise<Clientes> {
      const updateCliente = await this.clientesService.update(id, updateClienteDto);
  
      if (!updateCliente) {
        throw new NotFoundException(`Cliente con Id ${id} no se encontró`);
      }
  
      return updateCliente;
    }
  
    @Patch('updatePartial/:id')
    @ApiOperation({ summary: 'Actualizar un cliente parcialmente' })
    @ApiResponse({ status: 201, description: 'El cliente ha sido actualizado' })
    @ApiResponse({ status: 400, description: 'No se encuentra el cliente' })
    @ApiResponse({ status: 404, description: 'Solicitud incorrecta' })
    @ApiBody({
      description: 'Cuerpo de solicitud para actualizar un cliente',
      examples: {
        example: {
          summary: 'Ejemplo de actualización',
          value: {
            nombre_cliente: 'Cliente_actualizacionParcial',
            correo_cliente: 'clienteudpateparcial@gmail.com',
            telefono_cliente: '12345674354',
          },
        },
      },
    })
    async updatePartial(@Param('id') id: string,@Body() updateClienteDto: UpdateClienteDto,): Promise<void> {
      const updatePartialCliente = await this.clientesService.updatePartial(id, updateClienteDto);
  
    }
  }
  