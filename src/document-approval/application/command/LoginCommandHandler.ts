import { Inject, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as crypto from 'crypto-js';

import { ExceptionMessage } from 'src/constant/exception';

import { LoginCommand } from 'src/document-approval/application/command/LoginCommand';

import { IUserRepository } from 'src/document-approval/domain/user/repository/IUserRepository';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand, void> {
    constructor(@Inject('UserRepository') private readonly userRepository: IUserRepository) { }

    public async execute(command: LoginCommand): Promise<void> {
        const { email, password } = command;

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND);

        var bytes = crypto.AES.decrypt(user.getPassword(), 'secret');
        var decryptPassword = bytes.toString(crypto.enc.Utf8);

        if (decryptPassword !== password) throw new UnprocessableEntityException(ExceptionMessage.INVALID_PASSWORD);
    }
}
