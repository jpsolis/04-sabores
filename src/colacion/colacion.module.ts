import { Module } from '@nestjs/common';
import { ColacionService } from './colacion.service';
import { ColacionController } from './colacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Colacion } from './entities/colacion.entity';

@Module({
  controllers: [ColacionController],
  providers: [ColacionService],
  imports: [
     TypeOrmModule.forFeature([Colacion]), AuthModule
  ],
  exports:[
    ColacionService
  ]
})
export class ColacionModule {}
