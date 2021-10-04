class User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export class GetUserListResponseDto {
    count: number;
    users: User[];
  }
  