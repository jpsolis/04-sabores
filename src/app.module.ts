import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurante } from './restaurante/entities/restaurante.entity';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { FolderModule } from './folder/folder.module';
import { DataSource } from 'typeorm';
import { RestauranteModule } from './restaurante/restaurante.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { ColacionModule } from './colacion/colacion.module';
import { Colacion } from './colacion/entities/colacion.entity';
import { User } from './auth/entities/user.entity';
import { BebestibleModule } from './bebestible/bebestible.module';
import { Bebestible } from './bebestible/entities/bebestible.entity';
import { GarzonModule } from './garzon/garzon.module';
import { Garzon } from './garzon/entities/garzon.entity';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

@Module({
  // imports: [RestauranteModule, SeedModule],
  imports: [
   TypeOrmModule.forRoot({
     // ssl: process.env.STAGE === 'prod',
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Restaurante, Colacion, Bebestible, User, Garzon],
      autoLoadEntities: true,
    
      /* Warning Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.*/
      synchronize: true, 
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public'),
    }),

    RestauranteModule,

    SeedModule,

    AuthModule,

    ColacionModule,

    BebestibleModule,

    GarzonModule,

    MessagesWsModule
    
    
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
