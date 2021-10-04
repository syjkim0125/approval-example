import { Controller, Get, Query, Param, Post, Body, Headers, Put } from "@nestjs/common";
import { QueryBus, CommandBus } from "@nestjs/cqrs";

import { GetDocumentListDto } from "src/document-approval/interface/public/dto/document/GetDocumentListDto";
import { GetDocumentListResponseDto } from "src/document-approval/interface/public/dto/document/GetDocumentListResponseDto";
import { GetDocumentDto } from "src/document-approval/interface/public/dto/document/GetDocumentDto";
import { GetDocumentResponseDto } from "src/document-approval/interface/public/dto/document/GetDocumentResponseDto";
import { ApprovalRequestDto } from "src/document-approval/interface/public/dto/document/ApprovalRequestDto";
import { DocumentApprovalParamDto } from 'src/document-approval/interface/public/dto/document/DocumentApprovalParamDto';
import { DocumentApprovalBodyDto } from "src/document-approval/interface/public/dto/document/DocumentApprovalBodyDto";

import { GetDocumentListQuery } from "src/document-approval/application/query/document/GetDocumentListQuery";
import { GetDocumentListQueryResult } from "src/document-approval/application/query/document/GetDocumentListQueryResult";
import { GetDocumentQuery } from "src/document-approval/application/query/document/GetDocumentQuery";
import { GetDocumentQueryResult } from "src/document-approval/application/query/document/GetDocumentQueryResult";
import { ApprovalRequestCommand } from "src/document-approval/application/command/ApprovalRequestCommand";
import { DocumentApprovalCommand } from "src/document-approval/application/command/DocumentApprovalCommand";

@Controller('documents')
export class DocumentController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) { }

  @Get()
  public async getDocumentList(@Headers() headers, @Query() dto: GetDocumentListDto): Promise<GetDocumentListResponseDto> {
    const { user } = headers;
    const { offset, limit, status } = dto;

    const query = new GetDocumentListQuery(user, offset, limit, status);
    const queryResult: GetDocumentListQueryResult = await this.queryBus.execute(query);

    return queryResult;
  }

  @Get('/:id')
  public async getDocument(@Param() dto: GetDocumentDto): Promise<GetDocumentResponseDto> {
    const { id } = dto;

    const query = new GetDocumentQuery(id);
    const queryResult: GetDocumentQueryResult = await this.queryBus.execute(query);

    return queryResult;
  }

  @Post('/approval-request')
  public async approvalRequest(@Headers() headers, @Body() dto: ApprovalRequestDto): Promise<{ message: string }> {
    const { user } = headers;
    const { title, category, content, approvers } = dto;

    const command = new ApprovalRequestCommand(user, title, category, content, approvers);
    await this.commandBus.execute(command);

    return {
      message: "success"
    };
  }

  @Put('/:documentId/approvers/:approverId/approval')
  public async documentApproval(@Param() param: DocumentApprovalParamDto, @Body() body: DocumentApprovalBodyDto): Promise<{ message: string }> {
    const { documentId, approverId } = param;
    const { status, comment } = body;

    const command = new DocumentApprovalCommand(documentId, approverId, status, comment);
    await this.commandBus.execute(command);

    return {
      message: "success"
    };
  }
}
