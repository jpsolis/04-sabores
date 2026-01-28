import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RestauranteModule } from 'src/restaurante/restaurante.module';
import { AuthModule } from 'src/auth/auth.module';
import { ColacionModule } from 'src/colacion/colacion.module';
import { BebestibleModule } from 'src/bebestible/bebestible.module';
import { GarzonModule } from 'src/garzon/garzon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    RestauranteModule,
    ColacionModule,
    BebestibleModule,
    GarzonModule,
    AuthModule, 
    
  ]
})
export class SeedModule {}
