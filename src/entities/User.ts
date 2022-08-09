import { Length, length, Validate } from "class-validator";
import { Column, Entity, IsNull, JoinTable, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Category } from "./Category";
import { Note } from "./Note";
import { v4 as uuid } from "uuid";

@Entity("tb_users")
@Unique(["username"])
export class User {
    
    @PrimaryColumn("varchar")
    id: string;

    @Column("varchar")
    @Length(3, 30)
    username: string;

    @Column("text")
    pass: string;

    @Column({type: "text", nullable: true})
    @Length(0, 500)
    photo: string;

    @OneToMany((type) => Category, user => User)
    categories: Array<Category>

    @OneToMany((type) => User, notes => Note)
    notes: Array<Note>;

    constructor(username: string, senha: string, photo?: string, id?: string) {
        this.username = username;
        this.pass = senha;
        this.photo = photo;

        if(!id)
            this.id = uuid();
    }
}