import uuid = require('uuid');
import { Injectable, Inject } from "@nestjs/common";
import { getRepository } from 'typeorm';

import { ApplicantMapper } from 'src/document-approval/infra/persistence/repository/document/ApplicantMapper';
import { ApplicantEntity } from 'src/document-approval/infra/persistence/entity/document/ApplicantEntity';

import { IApplicantRepository } from 'src/document-approval/domain/document/repository/IApplicantRepository';
import { Applicant } from 'src/document-approval/domain/document/model/Applicant';

@Injectable()
export class ApplicantRepository implements IApplicantRepository {
    constructor(@Inject(ApplicantMapper) private readonly applicantMapper: ApplicantMapper) { }

    public nextId(): string {
        return uuid.v1();
    }

    public async save(data: Applicant | Applicant[]): Promise<void> {
        const models = Array.isArray(data) ? data : [data];
        const entities = models.map((model) => {
            const version = model.getVersion();
            model.setVersion(version + 1);
            return this.applicantMapper.toEntity(model)
        });
        await getRepository(ApplicantEntity).save(entities);
    }
}
