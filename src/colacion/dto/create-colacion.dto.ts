import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateColacionDto {
    @IsString()
    @MinLength(4)
    nombre: string;

    @IsString()
    @MinLength(4)
    descripcion: string;

    @IsNumber()
    @IsNotEmpty()
    precio: number;
}