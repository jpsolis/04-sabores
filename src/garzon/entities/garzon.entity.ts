import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'garzon'})
export class Garzon{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
}