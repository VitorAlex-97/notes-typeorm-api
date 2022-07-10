import { Repository } from "typeorm"
import { Request, Response } from "express"
import { User } from "../entities/User"
import { UserService } from "../services/user.service"
import { validate } from "class-validator"

export class UserController {

    constructor(
        private userRepository: Repository<User>,
        private userService: UserService
    ) {
        this.userRepository = userRepository;
    }
 
    newUser = async (req: Request, res: Response) => {    
        const { user } = req.body;

        const passEncrypted = await this.userService.encryptPassword(user.pass);

        const newUser = new User(
            user.name, 
            passEncrypted,
            user.photo
        );

        console.log(newUser);

        const erros = await validate(User);
        if(erros.length > 0) {
            res.status(400).json(erros);
            return;
        }

        this.userRepository.findOne({
            where: {
                username: newUser.username
            }
        }).then((userRepo) => {
            if(userRepo)
               throw new Error("User already exist");

            this.userRepository.save(newUser).then(() => {
                console.log("CRIANDO UM NOVO USUÁRIO");
                res.status(201).json({message: "User created"});
            });        
        }).catch((e) => {
            console.log(`error >>> ${e.message}`)
            res.status(400).json({error: e.message});
        });
    }

    changePassword = async (req: Request, res: Response) => {
        const [{ password }, { newPassword }, { userId }] = [ req.body, req.body, req.params ];
        
        this.userRepository.findOne({
            where: {
                id: userId
            }
        }).then(async (userRepo) => {
            if(!userRepo)
                throw new Error("User does not exist");

            if(await this.userService.comparePassword(password, userRepo.pass)) {
                userRepo.pass = await this.userService.encryptPassword(newPassword);

                this.userRepository.save(userRepo).then(() => {
                    console.log('>>>>>>>>>>>>>> SENHA ALTERADA >>>>>>>>>>>>>>>>>');
                    res.status(200).json({message: "Passaword updated"});
                }).catch((e) => {
                    console.log(`error >>> ${e.message}`);
                    res.status(400).json({error: e.message});
                });
            } else {
                res.status(400).json({error: "Password does not iquals"});
            }
        });
    }

}