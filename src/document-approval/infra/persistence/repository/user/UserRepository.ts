import uuid = require('uuid');
import { Injectable, Inject } from "@nestjs/common";
import { getRepository } from 'typeorm';

import { UserMapper } from 'src/document-approval/infra/persistence/repository/user/UserMapper';
import { UserEntity } from 'src/document-approval/infra/persistence/entity/user/UserEntity';

import { IUserRepository } from 'src/document-approval/domain/user/repository/IUserRepository';
import { User } from 'src/document-approval/domain/user/model/User';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@Inject(UserMapper) private readonly userMapper: UserMapper) { }

    public nextId(): string {
        return uuid.v1();
    }

    public async save(data: User | User[]): Promise<void> {
        const models = Array.isArray(data) ? data : [data];
        const entities = models.map((model) => {
            const version = model.getVersion();
            model.setVersion(version + 1);
            return this.userMapper.toEntity(model)
        });
        await getRepository(UserEntity).save(entities);
    }

    public async findById(id: string): Promise<User | null> {
        const entity = await getRepository(UserEntity).findOne({ id });
        return entity ? this.userMapper.entityToModel(entity) : null;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const entity = await getRepository(UserEntity).findOne({ email });
        return entity ? this.userMapper.entityToModel(entity) : null;
    }
}
