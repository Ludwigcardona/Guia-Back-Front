import { IsOptional, IsString, IsEmail, IsBoolean } from "class-validator";

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  nombre_cliente?: string;

  @IsOptional()
  @IsEmail()
  correo_cliente?: string;

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
