import { IsNotEmpty, IsString, IsEmail, IsOptional, IsBoolean } from "class-validator";

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  nombre_cliente: string;

  @IsNotEmpty()
  @IsEmail()
  correo_cliente: string;

  @IsOptional()
  @IsString()
  telefono_cliente?: string;

  @IsOptional()
  @IsString()
  direccion_cliente?: string;

  @IsOptional()
  @IsBoolean()
  activo_cliente?: boolean;
}
