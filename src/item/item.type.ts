import { Document, ObjectId } from 'mongodb';

export interface IItemData {
    name: string;
    description: string;
    price: number;
}
export interface IItem extends IItemData {
    id: string;
}

export interface SearchQuery {
    name?: { $regex: string; $options: string };
    price?: { $gte?: number; $lte?: number };
}

export interface ItemDocument extends Document, IItemData {
    _id: ObjectId;
}


export interface IRentItemDto {
    startDate: Date;
    endDate: Date;
    itemId: string;
}