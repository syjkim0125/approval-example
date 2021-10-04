export enum ExceptionMessage {

    // NotFoundException
    DOCUMENT_NOT_FOUND = 'Document not found',
    APPROVER_NOT_FOUND = 'Approver not found',
    USER_NOT_FOUND = 'User not found',

    // UnprocessableEntityException
    INVALID_USER = 'Invalid user',
    DOCUMENT_STATUS_IS_NOT_ON_GOING = 'Document status is not on going',
    APPROVAL_STATUS_CANNOT_BE_ON_GOING = 'Approval status cannot be on going',
    APPROVER_IS_NOT_CURRENT_APPROVAL_ORDER = 'approver is not current approval order',
    INVALID_PASSWORD = 'Invalid password',
    USER_ALREADY_EXIST = 'User already exist'
}
