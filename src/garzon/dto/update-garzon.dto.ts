import { PartialType } from "@nestjs/mapped-types";
import { CreateGarzonDto } from "./create-garzon.dto";

export class UpdateGarzonDto extends PartialType(CreateGarzonDto){}