import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Colacion } from './entities/colacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateColacionDto } from './dto/create-colacion.dto';
import { UpdateColacionDto } from './dto/update-colacion.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ColacionService {
  private readonly logger = new Logger('ColacionService');

  constructor(
    @InjectRepository(Colacion)
    private colacionRepository: Repository<Colacion>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createColacionDto: CreateColacionDto) {
    try {
      const colacion = this.colacionRepository.create(createColacionDto);
      await this.colacionRepository.save(colacion);
    } catch (error) {}
  }

  findAll(): Promise<Colacion[]> {
    return this.colacionRepository.find();
  }

  findOne(id: number): Promise<Colacion | null> {
    return this.colacionRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateColacionDto: UpdateColacionDto,
    user: User,
  ) {
    const { ...toUpdate } = updateColacionDto;

    const colacion = await this.colacionRepository.preload({ id, ...toUpdate  });
    if (!colacion) throw new NotFoundException(`Colación con id: ${id} no encontrado`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(colacion);
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
    await this.colacionRepository.delete(id);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllColaciones() {
    const query = this.colacionRepository.createQueryBuilder('colacion');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
