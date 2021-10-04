import { AggregateRoot } from "@nestjs/cqrs";

export class User extends AggregateRoot {
    private readonly id: string;

    private readonly name: string;

    private readonly email: string;

    private readonly password: string;

    private readonly createdAt: Date;

    private readonly updatedAt: Date;

    private version: number;

    constructor(
        id: string,
        name: string,
        email: string,
        password: string,
        createdAt: Date,
        updatedAt: Date,
    ) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public getVersion(): number {
        return this.version ? this.version : 0;
    }

    public setVersion(version): number {
        return this.version = version;
    }
}
