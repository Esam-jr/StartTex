import { UsersService } from './users.service';
import { Role } from '../common/enums/role.enum';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findOne(id: string): Promise<any>;
    update(id: string, userData: any): Promise<any>;
    updateRoles(id: string, roles: Role[]): Promise<any>;
}
