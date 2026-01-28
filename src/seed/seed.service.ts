import { Injectable } from '@nestjs/common';
import { RestauranteService } from 'src/restaurante/restaurante.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColacionService } from 'src/colacion/colacion.service';
import { BebestibleService } from 'src/bebestible/bebestible.service';
import { GarzonService } from 'src/garzon/garzon.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly restauranteService: RestauranteService,
    private readonly colacionService: ColacionService,
    private readonly bebestibleService: BebestibleService,
    private readonly garzonService: GarzonService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();

    const adminUser = await this.insertUsers();
    await this.insertRestaurante();
    await this.insertColaciones();
    await this.insertBebestibles();
    await this.insertGarzones();

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.restauranteService.deleteAllRestaurantes();
    await this.colacionService.deleteAllColaciones();
    await this.bebestibleService.deleteAllBebestibles();
    await this.garzonService.deleteAllGarzones();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertRestaurante() {
    await this.restauranteService.deleteAllRestaurantes();

    const restaurantes = initialData.restaurante;

    const insertPromises: any[] = [];

    restaurantes.forEach((restaurant) => {
      insertPromises.push(this.restauranteService.create(restaurant));
    });

    await Promise.all(insertPromises);

    return true;
  }

  private async insertColaciones() {
    await this.colacionService.deleteAllColaciones();

    const colaciones = initialData.colaciones;

    const insertPromises: any[] = [];

    colaciones.forEach((colacion) => {
      insertPromises.push(this.colacionService.create(colacion));
    });

    await Promise.all(insertPromises);

    return true;
  }

  private async insertBebestibles() {
    await this.bebestibleService.deleteAllBebestibles();

    const bebestibles = initialData.bebestibles;

    const insertPromises: any[] = [];

    bebestibles.forEach((bebestible) => {
      insertPromises.push(this.bebestibleService.create(bebestible));
    });

    await Promise.all(insertPromises);

    return true;
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];
  }

  
  private async insertGarzones() {
    await this.garzonService.deleteAllGarzones();

    const garzones = initialData.garzones;

    const insertPromises: any[] = [];

    garzones.forEach((garzon) => {
      insertPromises.push(this.garzonService.create(garzon));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
