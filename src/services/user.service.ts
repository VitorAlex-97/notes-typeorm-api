import * as bcrypt from "bcryptjs"
import { Repository } from "typeorm";
import { v4 as uuid} from "uuid"
import { User } from "../entities/User";

export class UserService {

    constructor(
        private userRepository: Repository<User>
    ){}

    generatedId (): string {
        return uuid();
    }

    encryptPassword = async (password: string) => {
        const encryptPassword = await bcrypt.hash(password, 8);
        return encryptPassword;
    }

    comparePassword = async (password: string, hash: string)  => {
        const isIqual = await bcrypt.compare(password, hash);
        return isIqual;
    }

    findOneByIdOrFail = async(id: string): Promise<User> => {
        const user = await this.userRepository.findOne({
            where: {
                id
            }
        });
        if(!user){
            throw new Error('User does not exist');
        } else {
            return user;
        }
    }
}