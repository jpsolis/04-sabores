import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BebestibleService } from './bebestible.service';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth, GetUser } from 'src/auth/decorators';
import { CreateBebestibleDto } from './dto/create-bebestible.dto';
import { UpdateBebestibleDto } from './dto/update-bebestible.dto';
import { User } from 'src/auth/entities/user.entity';

@Controller('bebestible')
export class BebestibleController {
  constructor(private readonly bebestibleService: BebestibleService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createBebestibleDto: CreateBebestibleDto) {
    return this.bebestibleService.create(createBebestibleDto);
  }

  @Get()
  findAll() {
    return this.bebestibleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bebestibleService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id') id: string,
    @Body() updateBebestibleDto: UpdateBebestibleDto,
    @GetUser() user: User,
  ) {
    return this.bebestibleService.update(+id, updateBebestibleDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.bebestibleService.remove(+id);
  }
}
