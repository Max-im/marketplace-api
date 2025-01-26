import { ISuccessMessage } from "./message.type";

export class SuccessMessage<T> implements ISuccessMessage<T> {
    payload: T;
    error = false;
    code = 200;

    constructor(data: T, code: number = 200) {
        this.payload = data;
        this.code = code;
    }
}