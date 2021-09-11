import { BaseError } from './baseError';

export class UserError extends BaseError {
    constructor(code: string, message: string) {
        super(code, message);
    }
}
