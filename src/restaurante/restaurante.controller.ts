import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';

@Controller('restaurante')
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createRestauranteDto: CreateRestauranteDto) {
    return this.restauranteService.create(createRestauranteDto);
  }

  @Get()
  findAll() {
    return this.restauranteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restauranteService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id') id: string,
    @Body() updateRestauranteDto: UpdateRestauranteDto,
    @GetUser() user: User,
  ) {
    return this.restauranteService.update(+id, updateRestauranteDto, user);
  }

  @Delete(':id')
 @Auth(ValidRoles.admin)
  remove(@Param('id') id: string,) {
    return this.restauranteService.remove(+id);
  }
}


