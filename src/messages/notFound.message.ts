import { NOT_FOUND_MSG } from "../constants";
import { ErrorMessage } from "./error.message";

export class NotFoundMessage extends ErrorMessage {
    constructor(message: string = NOT_FOUND_MSG) {
        super(message, 404);
    }
}
