import { Repository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { UserService } from "../services/user.service";
import { validate } from "class-validator";

export class UserController {
  constructor(
    private userRepository: Repository<User>,
    private userService: UserService
  ) {}

  getOneById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log(id)
      const user = await this.userService.findOneByIdOrFail(id)
      if (!user) {
        res.status(400).send({erroMessage: 'User does not exist'})
        return
      }
      res.status(400).json(user)
    } catch (error) {
      console.log(error)
      res.status(500).send({errorMessage: 'Internal Server Error'})
    }
  }

  newUser = async (req: Request, res: Response) => {
    try {
      const user = req.body;
      console.log(user);
      const passEncrypted = await this.userService.encryptPassword(user.pass);
      const newUser = new User(user.username, passEncrypted, user.photo);
  
      const erros = await validate(User);
      if (erros.length > 0) {
        res.status(400).json(erros);
        return;
      }
  
      const userExist = await this.userRepository.findOne({
        where: {
          username: newUser.username,
        }
      })
      
      if (userExist) {
        res.status(400).send({errorMessage: 'User already exist'})
        return
      }
      console.log("CRIANDO UM NOVO USUÁRIO");
      const userSaved = await this.userRepository.save(newUser)
      const { pass, ...userData } = userSaved;
      res.status(201).json(userData);
    } catch (error) {
      console.log(error)
      res.status(500).send({errorMessage: 'Internal Server Error'})
    }
  }

  changePassword = async (req: Request, res: Response) => {
    const [{ password }, { newPassword }, { userId }] = [
      req.body,
      req.body,
      req.params,
    ];

    this.userRepository
      .findOne({
        where: {
          id: userId,
        },
      })
      .then(async (userRepo) => {
        if (!userRepo) throw new Error("User does not exist");

        if (await this.userService.comparePassword(password, userRepo.pass)) {
          userRepo.pass = await this.userService.encryptPassword(newPassword);

          this.userRepository
            .save(userRepo)
            .then(() => {
              console.log(">>>>>>>>>>>>>> SENHA ALTERADA >>>>>>>>>>>>>>>>>");
              res.status(200).json({ message: "Passaword updated" });
            })
            .catch((e) => {
              console.log(`error >>> ${e.message}`);
              res.status(400).json({ error: e.message });
            });
        } else {
          res.status(400).json({ error: "Password does not iquals" });
        }
      });
  }
}
