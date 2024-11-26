import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Importamos nuestro esquema
import { Proveedores } from '../schema/proveedores.schema';

// Importamos nuestros dto's
import { CreateProveedoresDto } from '../dto/create-proveedores.dto';
import { UpdateProveedoresDto } from '../dto/update-proveedores.dto';
import { createPrivateKey, privateDecrypt } from 'crypto';
import { create } from 'domain';

@Injectable()
export class ProveedoresServices{

    constructor(@InjectModel(Proveedores.name) private proveedorModel: Model<Proveedores>) 
    {

    }


async createProveedor(createProveedorDto: CreateProveedoresDto): Promise<Proveedores>{
    const createProveedor = new this.proveedorModel(createProveedorDto);
    return createProveedor.save();
  }

 s
async findAll(): Promise<Proveedores[]> {
    const findAllProveedores = await this.proveedorModel.find().exec();
    return findAllProveedores;
  }

async findOne(id: string): Promise<Proveedores> {
    const findOneProveedor = await this.proveedorModel.findById(id).exec();
  
    if (!findOneProveedor) {
      throw new NotFoundException(`Proveedor con Id ${id} no se encontró`);
    }
  
    return findOneProveedor;
  }


async update(id: string, updateProveedoresDto: UpdateProveedoresDto): Promise<Proveedores> {
    const updateProveedor = await this.proveedorModel.findByIdAndUpdate(id, updateProveedoresDto, { new: true }).exec();
  
    if (!updateProveedor) {
      throw new NotFoundException(`Proveedor con Id ${id} no se encontró`);
    }
  
    return updateProveedor;
  }

async updatePartial(id: string, updateProveedoresDto: UpdateProveedoresDto): Promise<Proveedores> {
    const updatePartialProveedor = await this.proveedorModel.findByIdAndUpdate(id, updateProveedoresDto, { new: true }).exec();
  
    if (!updatePartialProveedor) {
      throw new NotFoundException(`Proveedor con Id ${id} no se encontró`);
    }
  
    return updatePartialProveedor;
  }

  async desactivate(id: string): Promise<void> {
    const result = await this.proveedorModel.findByIdAndUpdate(
      id,
      { activo_proveedor: false }, 
      { new: true } 
    ).exec();
  
    if (!result) {
      throw new NotFoundException(`Proveedor con Id ${id} no se encontró`);
    }
  }

  async active(id: string): Promise<void> {
    const result = await this.proveedorModel.findByIdAndUpdate(
      id,
      { activo_proveedor: true },
      { new: true }
    ).exec();
  
    if (!result) {
      throw new NotFoundException(`Proveedor con Id ${id} no se encontró`);
    }
  }

  async delete(id: string): Promise<void> {
    const deleteProveedor = await this.proveedorModel.findByIdAndDelete(id);
  
    if (!deleteProveedor) {
      throw new NotFoundException(`Proveedor con Id ${id} no se encontró`);
    }
  }
}