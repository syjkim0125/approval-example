import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';
import { DocumentEntity } from 'src/document-approval/infra/persistence/entity/document/DocumentEntity';
import { ApplicantEntity } from 'src/document-approval/infra/persistence/entity/document/ApplicantEntity';
import { ApproverEntity } from 'src/document-approval/infra/persistence/entity/document/ApproverEntity';
import { CommentEntity } from 'src/document-approval/infra/persistence/entity/document/CommentEntity';
import { UserEntity } from 'src/document-approval/infra/persistence/entity/user/UserEntity';

class DBConfig {
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly synchronize: boolean;
  readonly logging: boolean;
}

export class AppService implements OnModuleInit, OnModuleDestroy {
  private databaseConnection?: Connection | void;

  static port(): number {
    const { PORT } = process.env;
    return PORT && Number(PORT) ? Number(PORT) : 3000;
  }

  async onModuleInit(): Promise<void> {
    const entities = [DocumentEntity, ApplicantEntity, ApproverEntity, CommentEntity, UserEntity];

    this.databaseConnection = await createConnection({
      ...this.loadDBConfig(),
      type: 'mysql',
      entities,
    }).catch((error: Error) => this.failToConnectDatabase(error));
  }

  private loadDBConfig(): DBConfig {
    return {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      database: process.env.DATABASE_NAME || 'approvalservice',
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'test',
      synchronize: 'true' === process.env.DATABASE_SYNC || true,
      logging: 'true' === process.env.DATABASE_LOGGING || true,
    };
  }

  private failToConnectDatabase(error: Error): void {
    console.error(error);
    process.exit(1);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.databaseConnection) await this.databaseConnection.close();
  }
}
