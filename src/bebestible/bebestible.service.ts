import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Bebestible } from './entities/bebestible.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateBebestibleDto } from './dto/create-bebestible.dto';
import { UpdateBebestibleDto } from './dto/update-bebestible.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class BebestibleService {
 private readonly logger = new Logger('BebestibleService');

  constructor(
    @InjectRepository(Bebestible)
    private bebestibleRepository: Repository<Bebestible>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createBebestibleDto: CreateBebestibleDto) {
    try {
      const bebestible = this.bebestibleRepository.create(createBebestibleDto);
      await this.bebestibleRepository.save(bebestible);
    } catch (error) {}
  }

  findAll(): Promise<Bebestible[]> {
    return this.bebestibleRepository.find();
  }

  findOne(id: number): Promise<Bebestible | null> {
    return this.bebestibleRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateBebestibleDto: UpdateBebestibleDto,
    user: User,
  ) {
    const { ...toUpdate } = updateBebestibleDto;

    const bebestible = await this.bebestibleRepository.preload({ id, ...toUpdate  });
    if (!bebestible) throw new NotFoundException(`Bebestible con id: ${id} no encontrado`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(bebestible);
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
    await this.bebestibleRepository.delete(id);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllBebestibles() {
    const query = this.bebestibleRepository.createQueryBuilder('bebestible');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


}
