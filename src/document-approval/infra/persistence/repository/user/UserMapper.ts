import { Injectable, Inject } from "@nestjs/common";

import { UserEntity } from "src/document-approval/infra/persistence/entity/user/UserEntity";

import { UserFactory } from "src/document-approval/domain/user/factory/UserFactory";
import { User } from "src/document-approval/domain/user/model/User";

@Injectable()
export class UserMapper {
    constructor(@Inject(UserFactory) private readonly userFactory: UserFactory) { }

    public toEntity(domain: User): UserEntity {
        const entity = new UserEntity();
        entity.id = domain.getId();
        entity.name = domain.getName();
        entity.email = domain.getEmail();
        entity.password = domain.getPassword();
        entity.createdAt = domain.getCreatedAt();
        entity.updatedAt = domain.getUpdatedAt();
        entity.version = domain.getVersion();

        return entity
    }

    public entityToModel(entity: UserEntity): User {
        const {
            id,
            name,
            email,
            password,
            createdAt,
            updatedAt,
            version
        } = entity;
        const domain = this.userFactory.reconstitute(
            id,
            name,
            email,
            password,
            createdAt,
            updatedAt,
        );
        domain.setVersion(version);

        return domain;
    }
}