import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateBebestibleDto {
  @IsString()
  @MinLength(4)
  nombre: string;

  @IsString()
  @MinLength(4)
  tipo: string;

  @IsNumber()
  @IsNotEmpty()
  precio: number;
}
