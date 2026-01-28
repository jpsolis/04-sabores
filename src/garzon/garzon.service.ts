import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Garzon } from './entities/garzon.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateGarzonDto } from './dto/create-garzon.dto';
import { UpdateGarzonDto } from './dto/update-garzon.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class GarzonService {
    private readonly logger = new Logger('GarzonService');
    
      constructor(
        @InjectRepository(Garzon)
        private garzonRepository: Repository<Garzon>,
        private readonly dataSource: DataSource,
      ) {}
    
      async create(createGarzonDto: CreateGarzonDto) {
        try {
          const garzon = this.garzonRepository.create(createGarzonDto);
          await this.garzonRepository.save(garzon);
        } catch (error) {}
      }
    
      findAll(): Promise<Garzon[]> {
        return this.garzonRepository.find();
      }
    
      findOne(id: number): Promise<Garzon | null> {
        return this.garzonRepository.findOneBy({ id });
      }
    
      async update(
        id: number,
        updateGarzonDto: UpdateGarzonDto,
        user: User,
      ) {
        const { ...toUpdate } = updateGarzonDto;
    
        const garzon = await this.garzonRepository.preload({ id, ...toUpdate  });
        if (!garzon) throw new NotFoundException(`Garzón con id: ${id} no encontrado`);
    
        // Create query runner
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
          await queryRunner.manager.save(garzon);
          await queryRunner.commitTransaction();
          await queryRunner.release();
    
          return this.findOnePlain(id);
        } catch (error) {
          await queryRunner.rollbackTransaction();
          await queryRunner.release();
          this.handleDBExceptions(error);
        }
      }
    
      async findOnePlain(term: number) {
        const { ...rest } = await this.findOne(term);
        return {
          ...rest,
        };
      }
    
      async remove(id: number): Promise<void> {
        await this.garzonRepository.delete(id);
      }
    
      private handleDBExceptions(error: any) {
        if (error.code === '23505') throw new BadRequestException(error.detail);
    
        this.logger.error(error);
        throw new InternalServerErrorException(
          'Unexpected error, check server logs',
        );
      }
    
      async deleteAllGarzones() {
        const query = this.garzonRepository.createQueryBuilder('garzon');
    
        try {
          return await query.delete().where({}).execute();
        } catch (error) {
          this.handleDBExceptions(error);
        }
      }
}
