import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "song" })
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 70 })
    artista: string;

    @Column({ nullable: false, length: 50 })
    title: string;

    @Column({ nullable: false, length: 50 })
    album: string;

    @Column()
    imgPath: string;

    @Column()
    audioPath: string;
}