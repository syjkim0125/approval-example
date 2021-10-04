import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ApplicantMapper } from 'src/document-approval/infra/persistence/repository/document/ApplicantMapper';
import { ApproverMapper } from 'src/document-approval/infra/persistence/repository/document/ApproverMapper';
import { CommentMapper } from 'src/document-approval/infra/persistence/repository/document/CommentMapper';
import { DocumentMapper } from 'src/document-approval/infra/persistence/repository/document/DocumentMapper';
import { UserMapper } from 'src/document-approval/infra/persistence/repository/user/UserMapper';
import { ApplicantRepository } from 'src/document-approval/infra/persistence/repository/document/ApplicantRepository';
import { ApproverRepository } from 'src/document-approval/infra/persistence/repository/document/ApproverRepository';
import { CommentRepository } from 'src/document-approval/infra/persistence/repository/document/CommentRepository';
import { DocumentRepository } from 'src/document-approval/infra/persistence/repository/document/DocumentRepository';
import { UserRepository } from 'src/document-approval/infra/persistence/repository/user/UserRepository';
import { DocumentQuery } from 'src/document-approval/infra/persistence/query/DocumentQuery';
import { UserQuery } from 'src/document-approval/infra/persistence/query/UserQuery';

import { DocumentController } from 'src/document-approval/interface/public/controller/document/DocumentController';
import { UserController } from 'src/document-approval/interface/public/controller/user/UserController';

import { GetDocumentListQueryHandler } from 'src/document-approval/application/query/document/GetDocumentListQueryHandler';
import { GetDocumentQueryHandler } from 'src/document-approval/application/query/document/GetDocumentQueryHandler';
import { ApprovalRequestCommandHandler } from 'src/document-approval/application/command/ApprovalRequestCommandHandler';
import { DocumentApprovalCommandHandler } from 'src/document-approval/application/command/DocumentApprovalCommandHandler';
import { GetUserListQueryHandler } from 'src/document-approval/application/query/user/GetUserListQueryHandler';
import { RegisterCommandHandler } from 'src/document-approval/application/command/RegisterCommandHandler';
import { LoginCommandHandler } from 'src/document-approval/application/command/LoginCommandHandler';

import { ApplicantFactory } from 'src/document-approval/domain/document/factory/ApplicantFactory';
import { ApproverFactory } from 'src/document-approval/domain/document/factory/ApproverFactory';
import { CommentFactory } from 'src/document-approval/domain/document/factory/CommentFactory';
import { DocumentFactory } from 'src/document-approval/domain/document/factory/DocumentFactory';
import { UserFactory } from 'src/document-approval/domain/user/factory/UserFactory';
import { DocumentDomainService } from 'src/document-approval/domain/document/service/DocumentDomainService';

// infrastructures
const mappers = [ApplicantMapper, ApproverMapper, CommentMapper, DocumentMapper, UserMapper];
const repositories = [
    { provide: 'ApplicantRepository', useClass: ApplicantRepository },
    { provide: 'ApproverRepository', useClass: ApproverRepository },
    { provide: 'DocumentRepository', useClass: DocumentRepository },
    { provide: 'UserRepository', useClass: UserRepository },
    { provide: 'CommentRepository', useClass: CommentRepository },
];
const queries = [
    { provide: 'DocumentQuery', useClass: DocumentQuery },
    { provide: 'UserQuery', useClass: UserQuery }
];

// interfaces
const controllers = [DocumentController, UserController];

// applications
const handlers = [
    GetDocumentListQueryHandler,
    GetDocumentQueryHandler,
    ApprovalRequestCommandHandler,
    DocumentApprovalCommandHandler,
    GetUserListQueryHandler,
    RegisterCommandHandler,
    LoginCommandHandler
];

// domains
const factories = [ApplicantFactory, ApproverFactory, CommentFactory, DocumentFactory, UserFactory];
const domainServices = [DocumentDomainService];

@Module({
    imports: [CqrsModule],
    controllers,
    providers: [...mappers, ...repositories, ...queries, ...handlers, ...factories, ...domainServices],
})
export class DocumentApprovalModule { }
