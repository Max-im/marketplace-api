import { IItemData } from "../item.type";

export default class CreateItemDto implements IItemData {
    name: string;
    description: string;
    price: number;

    constructor(data: IItemData) {
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
    }
}