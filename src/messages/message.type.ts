export interface IErrorMessage {
    payload: { message: string };
    error: boolean;
    code: number;
}

export interface ISuccessMessage<T> {
    payload: T;
    error: boolean;
    code: number;
}

export type IMessage<T> = ISuccessMessage<T> | IErrorMessage;