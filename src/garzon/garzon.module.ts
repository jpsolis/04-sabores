import { Module } from '@nestjs/common';
import { GarzonService } from './garzon.service';
import { GarzonController } from './garzon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garzon } from './entities/garzon.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [GarzonController],
  providers: [GarzonService],
  imports: [
       TypeOrmModule.forFeature([Garzon]), AuthModule
    ],
    exports:[
      GarzonService
    ]
})
export class GarzonModule {}
