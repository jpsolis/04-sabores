import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { DataSource, Repository } from 'typeorm';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { Restaurante } from './entities/restaurante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class RestauranteService {

 private readonly logger = new Logger('RestauranteService');

  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,
    private readonly dataSource: DataSource,
  ){}

  async create(createRestauranteDto: CreateRestauranteDto) {
    try {
      const restaurante = this.restauranteRepository.create(createRestauranteDto);
      await this.restauranteRepository.save(restaurante);
    } catch (error) {}
  }

  findAll(): Promise<Restaurante[]> {
       return this.restauranteRepository.find();
  }

  findOne(id: number): Promise<Restaurante | null> {
    return this.restauranteRepository.findOneBy({id});
  }

  async update( id: number, updateRestauranteDto: UpdateRestauranteDto, user : User ) {
    const { ...toUpdate } = updateRestauranteDto;

    const restaurante = await this.restauranteRepository.preload({ id, ...toUpdate });
    if( !restaurante ) throw new NotFoundException(`Restaurante con id: ${ id } no encontrado`);


    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();



    try {
    await queryRunner.manager.save( restaurante );
    await queryRunner.commitTransaction();
    await queryRunner.release();

    return this.findOnePlain( id );
    } catch( error ){
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }

  
  }

  async findOnePlain( term: number ) {
    const { ...rest } = await this.findOne( term );
    return {
      ...rest,
    }
  }


   async remove(id: number): Promise<void> {
    await this.restauranteRepository.delete(id);
  }

    private handleDBExceptions(error: any){
      if(error.code === '23505')
        throw new BadRequestException(error.detail);
  
      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, check server logs');
    }

    async deleteAllRestaurantes(){
    const query = this.restauranteRepository.createQueryBuilder('restaurante');

    try {
      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

}
