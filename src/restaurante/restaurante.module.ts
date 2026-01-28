import { Module } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { RestauranteController } from './restaurante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurante } from './entities/restaurante.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RestauranteController],
  providers: [RestauranteService],
  imports: [
    TypeOrmModule.forFeature([Restaurante]), AuthModule
  ],
  exports: [
    RestauranteService
  ]
})
export class RestauranteModule {}
