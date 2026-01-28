import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ type: 'varchar', length: 254, unique: true})
    email: string;

    @Column('text', {
        select: false
    })
    password?: string;

    @Column('text')
    nombreCompleto: string;

    @Column('bool', {
        default: true
    })
    estaActivo: boolean;

    @Column('simple-array')
    roles: string[] = ['usuario'];

    // @OneToMany(
    //     () => Reparacion, 
    //     ( reparacion ) => reparacion.user
    // )
    // reparacion : Reparacion;


    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    }

}
