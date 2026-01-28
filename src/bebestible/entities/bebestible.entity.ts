import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'bebestible'})
export class Bebestible{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    tipo: string;

    @Column()
    precio: number;
}