import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'colacion'})
export class Colacion{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    precio: number;


   




    


// @OneToMany(type => Reparacion, reparacion => reparacion.reparacion)
// reparaciones: Reparacion[]

} 