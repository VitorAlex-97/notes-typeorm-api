import { Request, Response } from "express";
import { request } from "http";
import { DataSource, Repository } from "typeorm";
import { Category } from "../entities/Category";
import { Note } from "../entities/Note";
import { User } from "../entities/User";
import * as moment from "moment";
import { AppDataSource } from "../db/dataSource";
import { Commons } from "../commons/Commons";

export class NoteController {
    constructor(
        private noteRepository: Repository<Note>,
        private userRepository: Repository<User>,
        private categoruRepository: Repository<Category>,
        private commons: Commons
    ) {}

    createNotes = async (request: Request, response: Response) => {
        const [ { title, body }, { userId }, { categoryId } ]  = [ 
            request.body, 
            request.params, 
            request.query 
        ];

        if(!(title && body)) {
            response.status(400).json({error: 'Title & body are required'});
            return;
        }

        this.userRepository.findOne({
            where: {
                id: userId
            }
        }).then((userRepo) => {
            if(!userRepo)
                throw new Error('User does not exist');

            const user =  userRepo;
            this.categoruRepository.findOne({
                where: {
                    id: +categoryId
                }
            }).then((categoryRepo) => {
                if(!categoryRepo)
                    throw new Error('Category does not exist');

                const category = categoryRepo;
                const newNote = new Note(title, body, category, user);

                this.noteRepository.save(newNote).then(() => {
                    response.status(201).json({message: 'Note created'});
                }).catch((e) => {
                    console.log(`error >>> ${e.message}`);
                    response.status(400).json({error: e.message});
                });
            }).catch((e) => {
                console.log(`error >>> ${e.message}`);
                response.status(400).json({error: e.message});
            });
        }).catch((e) => {
            console.log(`error >>> ${e.message}`);
            response.status(400).json({error: e.message});
        });

    }

    updateNote = async (request: Request, response: Response) => {
        const [ { title, body }, { userId }, { categoryId, noteId } ]  = [ 
            request.body, 
            request.params, 
            request.query 
        ];

        try {

            await this.commons.userExist(userId);
            
            await this.commons.categoryExist(+categoryId);
   
            const noteRepo = await this.commons.noteExist(+noteId);
            
            const currentDate = moment();

            noteRepo.title = title;
            noteRepo.body = body;
            noteRepo.editedAt = currentDate.toDate();

            const result = await this.noteRepository.update(+noteId, noteRepo);

            console.log(result);

            response.status(200).json({message: 'deu certo'})
             
        } catch (err) {
            response.status(400).json({error: err.message});         
        }

    }

    getNoteByCategory = async (request: Request, response: Response) => {
        
    }


}