import { getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/document-approval/infra/persistence/entity/user/UserEntity';

import { IUserQuery, UserListView } from 'src/document-approval/application/query/user/IUserQuery';

@Injectable()
export class UserQuery implements IUserQuery {
    public async findAll(offset: number, limit: number): Promise<UserListView> {
        const [entities, count] = await getRepository(UserEntity).findAndCount({ skip: offset, take: limit });

        return {
            count,
            users: entities.map(entity => {
                return {
                    id: entity.id,
                    name: entity.name,
                    email: entity.email,
                    createdAt: entity.createdAt,
                    updatedAt: entity.updatedAt
                }
            })
        }
    }
}
