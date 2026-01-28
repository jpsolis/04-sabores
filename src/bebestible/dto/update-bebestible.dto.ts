import { PartialType } from "@nestjs/mapped-types";
import { CreateBebestibleDto } from "./create-bebestible.dto";

export class UpdateBebestibleDto extends PartialType(CreateBebestibleDto){}