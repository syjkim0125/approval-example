import { Injectable, Inject } from "@nestjs/common";

import { ApplicantEntity } from "src/document-approval/infra/persistence/entity/document/ApplicantEntity";

import { ApplicantFactory } from "src/document-approval/domain/document/factory/ApplicantFactory";
import { Applicant } from "src/document-approval/domain/document/model/Applicant";

@Injectable()
export class ApplicantMapper {
    constructor(@Inject(ApplicantFactory) private readonly applicantFactory: ApplicantFactory) { }

    public toEntity(domain: Applicant): ApplicantEntity {
        const entity = new ApplicantEntity();
        entity.id = domain.getId();
        entity.userId = domain.getUserId();
        entity.documentId = domain.getDocumentId();
        entity.createdAt = domain.getCreatedAt();
        entity.version = domain.getVersion();

        return entity
    }

    public entityToModel(entity: ApplicantEntity): Applicant {
        const {
            id,
            userId,
            documentId,
            createdAt,
            version
        } = entity;
        const domain = this.applicantFactory.reconstitute(
            id,
            userId,
            documentId,
            createdAt
        );
        domain.setVersion(version);

        return domain;
    }
}
