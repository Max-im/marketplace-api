import { INTERNAL_ERROR_MSG } from "../constants";
import { IErrorMessage } from "./message.type";

export class ErrorMessage implements IErrorMessage {
    payload: {message: string};
    error = true;
    code = 500;

    constructor(message: string = INTERNAL_ERROR_MSG, code: number = 500) {
        this.payload = {message};
        this.code = code;
    }
}