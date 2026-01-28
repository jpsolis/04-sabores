import { PartialType } from "@nestjs/mapped-types";
import { CreateColacionDto } from "./create-colacion.dto";

export class UpdateColacionDto extends PartialType(CreateColacionDto){}