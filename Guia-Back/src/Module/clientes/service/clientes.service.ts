import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Importamos nuestro esquema
import { Clientes } from '../schema/cliente.schema';

// Importamos nuestros DTOs
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  async updatePartial(id: string, updateCliente: UpdateClienteDto): Promise<Clientes> {
    const updatePartialCliente = await this.clienteModel.findByIdAndUpdate(id, updateCliente, { new: true }).exec();
  
    if (!updatePartialCliente) {
      throw new NotFoundException(`Proveedor con Id ${id} no se encontró`);
    }
  
    return updatePartialCliente;
  }

  constructor(@InjectModel(Clientes.name) private clienteModel: Model<Clientes>) {}

  // Crear un nuevo cliente
  async createCliente(createClienteDto: CreateClienteDto): Promise<Clientes> {
    const nuevoCliente = new this.clienteModel(createClienteDto);
    return nuevoCliente.save();
  }

  // Obtener todos los clientes
  async findAll(): Promise<Clientes[]> {
    return this.clienteModel.find().exec();
  }

  // Obtener un cliente por ID
  async findOne(id: string): Promise<Clientes> {
    const cliente = await this.clienteModel.findById(id).exec();

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return cliente;
  }

  // Actualizar un cliente (completo)
  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Clientes> {
    const clienteActualizado = await this.clienteModel
      .findByIdAndUpdate(id, updateClienteDto, { new: true })
      .exec();

    if (!clienteActualizado) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return clienteActualizado;
  }

  // Activar un cliente
  async activate(id: string): Promise<void> {
    const result = await this.clienteModel
      .findByIdAndUpdate(id, { activo: true }, { new: true })
      .exec();

    if (!result) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
  }

  // Desactivar un cliente
  async deactivate(id: string): Promise<void> {
    const result = await this.clienteModel
      .findByIdAndUpdate(id, { activo: false }, { new: true })
      .exec();

    if (!result) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
  }

  // Eliminar un cliente
  async delete(id: string): Promise<void> {
    const clienteEliminado = await this.clienteModel.findByIdAndDelete(id);

    if (!clienteEliminado) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
  }
}
