import { Module } from '@nestjs/common';
import { BebestibleService } from './bebestible.service';
import { BebestibleController } from './bebestible.controller';
import { Bebestible } from './entities/bebestible.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BebestibleController],
  providers: [BebestibleService],
  imports: [
       TypeOrmModule.forFeature([Bebestible]), AuthModule
    ],
    exports:[
      BebestibleService
    ]
})
export class BebestibleModule {}
