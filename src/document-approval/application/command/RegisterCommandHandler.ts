import { Inject, UnprocessableEntityException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import uuid = require('uuid');
import * as crypto from 'crypto-js';

import { RegisterCommand } from 'src/document-approval/application/command/RegisterCommand';

import { UserFactory } from 'src/document-approval/domain/user/factory/UserFactory';
import { IUserRepository } from 'src/document-approval/domain/user/repository/IUserRepository';
import { ExceptionMessage } from 'src/constant/exception';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler<RegisterCommand, void> {
    constructor(
        @Inject(UserFactory) private readonly userFactory: UserFactory,
        @Inject('UserRepository') private readonly userRepository: IUserRepository
    ) { }

    public async execute(command: RegisterCommand): Promise<void> {
        const { name, email, password } = command;

        const existUser = await this.userRepository.findByEmail(email);
        if (existUser) throw new UnprocessableEntityException(ExceptionMessage.USER_ALREADY_EXIST)

        const hashPassword = await crypto.AES.encrypt(password, 'secret').toString();

        const userId = this.userRepository.nextId();
        const user = this.userFactory.create(userId, name, email, hashPassword);

        await this.userRepository.save(user);
    }
}
