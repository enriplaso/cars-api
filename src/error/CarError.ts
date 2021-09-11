import { BaseError } from "./baseError";

export class CarError extends BaseError {
    constructor(code: string, message: string) {
        super(code, message);
    
    }
}
