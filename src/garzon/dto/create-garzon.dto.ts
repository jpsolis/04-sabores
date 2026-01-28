import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateGarzonDto {
    @IsString()
    @MinLength(4)
    nombre: string;

}