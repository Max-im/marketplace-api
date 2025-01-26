import { IRentItemDto } from "../item.type";

export default class RentItemDto implements IRentItemDto {
    itemId: string;
    startDate: Date;
    endDate: Date;

    constructor(data: { itemId: string, startDate: string, endDate: string }) {
        this.itemId = data.itemId;
        this.startDate = new Date(data.startDate);
        this.endDate = new Date(data.endDate);
    }
}