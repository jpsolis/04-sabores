import { IsString, MinLength } from "class-validator";

export class CreateRestauranteDto {
    @IsString()
    @MinLength(4)
    nombre: string;

    @IsString()
    ubicacion: string;

}