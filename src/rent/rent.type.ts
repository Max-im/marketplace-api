import { Document, ObjectId } from 'mongodb';

export interface IRentData {
    item_id: ObjectId;
    start_date: Date;
    end_date: Date;
}

export interface IRentDocument extends Document, IRentData {
    _id: ObjectId;
}

export interface IRentResponse {
    rentId: string;
    itemId: string;
    startDate: Date;
    endDate: Date;
}