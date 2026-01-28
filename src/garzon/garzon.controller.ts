import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GarzonService } from './garzon.service';
import { CreateGarzonDto } from './dto/create-garzon.dto';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth, GetUser } from 'src/auth/decorators';
import { UpdateGarzonDto } from './dto/update-garzon.dto';
import { User } from 'src/auth/entities/user.entity';

@Controller('garzon')
export class GarzonController {
  constructor(private readonly garzonService: GarzonService) {}

  @Post()
    @Auth(ValidRoles.admin)
    create(@Body() createGarzonDto: CreateGarzonDto) {
      return this.garzonService.create(createGarzonDto);
    }
  
    @Get()
    findAll() {
      return this.garzonService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.garzonService.findOne(+id);
    }
  
    @Patch(':id')
    @Auth(ValidRoles.admin)
    update(
      @Param('id') id: string,
      @Body() updateColacionDto: UpdateGarzonDto,
      @GetUser() user: User,
    ) {
      return this.garzonService.update(+id, updateColacionDto, user);
    }
  
    @Delete(':id')
    @Auth(ValidRoles.admin)
    remove(@Param('id') id: string) {
      return this.garzonService.remove(+id);
    }
}
