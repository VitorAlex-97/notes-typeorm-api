import { Repository } from "typeorm";
import { Note } from "../entities/Note";

export class NoteRepository extends Repository<Note> {
    
    noteExist = async (noteId: number) => {
        const noteRepo = await this.findOne({
            where: {
                id: noteId
            }
        });
        return !!noteRepo;
    }

}