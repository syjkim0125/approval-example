import { Controller, Get, Query, Post, Body } from "@nestjs/common";
import { QueryBus, CommandBus } from "@nestjs/cqrs";

import { GetUserListDto } from "src/document-approval/interface/public/dto/user/GetUserListDto";
import { GetUserListResponseDto } from "src/document-approval/interface/public/dto/user/GetUserListResponseDto";
import { RegisterDto } from "src/document-approval/interface/public/dto/user/RegisterDto";
import { LoginDto } from "src/document-approval/interface/public/dto/user/LoginDto";

import { GetUserListQuery } from "src/document-approval/application/query/user/GetUserListQuery";
import { GetUserListQueryResult } from "src/document-approval/application/query/user/GetUserListQueryResult";
import { RegisterCommand } from "src/document-approval/application/command/RegisterCommand";
import { LoginCommand } from "src/document-approval/application/command/LoginCommand";

@Controller('users')
export class UserController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) { }

  @Get()
  public async getUserList(@Query() dto: GetUserListDto): Promise<GetUserListResponseDto> {
    const { offset, limit } = dto;

    const query = new GetUserListQuery(offset, limit);
    const queryResult: GetUserListQueryResult = await this.queryBus.execute(query);

    return queryResult;
  }

  @Post('/register')
  public async register(@Body() dto: RegisterDto): Promise<{ message: string }> {
    const { name, email, password } = dto;

    const command = new RegisterCommand(name, email, password);
    await this.commandBus.execute(command);

    return {
      message: "success"
    };
  }

  @Post('/login')
  public async login(@Body() dto: LoginDto): Promise<{ message: string }> {
    const { email, password } = dto;

    const command = new LoginCommand(email, password);
    await this.commandBus.execute(command);

    return {
      message: "success"
    };
  }
}
