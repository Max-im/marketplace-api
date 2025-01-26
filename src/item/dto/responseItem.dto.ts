import { IItem } from "../item.type";

export default class ResponseItemDto implements IItem {
    id: string;
    name: string;
    description: string;
    price: number;
    
    constructor(item: IItem) {
        this.id = item.id;
        this.name = item.name;
        this.description = item.description;
        this.price = item.price;
    }
}