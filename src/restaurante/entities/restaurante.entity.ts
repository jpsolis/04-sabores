import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'restaurante'})
export class Restaurante{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    ubicacion: string;

   




    


// @OneToMany(type => Reparacion, reparacion => reparacion.reparacion)
// reparaciones: Reparacion[]

} 