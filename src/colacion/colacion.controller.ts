import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ColacionService } from './colacion.service';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth, GetUser } from 'src/auth/decorators';
import { CreateColacionDto } from './dto/create-colacion.dto';
import { User } from 'src/auth/entities/user.entity';
import { UpdateColacionDto } from './dto/update-colacion.dto';

@Controller('colacion')
export class ColacionController {
  constructor(private readonly colacionService: ColacionService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createColacionDto: CreateColacionDto) {
    return this.colacionService.create(createColacionDto);
  }

  @Get()
  findAll() {
    return this.colacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colacionService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id') id: string,
    @Body() updateColacionDto: UpdateColacionDto,
    @GetUser() user: User,
  ) {
    return this.colacionService.update(+id, updateColacionDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.colacionService.remove(+id);
  }
}
