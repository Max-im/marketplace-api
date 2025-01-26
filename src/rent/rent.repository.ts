import { ObjectId } from "mongodb";
import { getClient } from "../db";
import { SuccessMessage, ErrorMessage } from "../messages";
import { IRentDocument, IRentResponse } from "./rent.type";


class RentRepository {
    private get client() {
        const collection = 'rents';
        return getClient(collection);
    }

    private IRentEntity(rent: IRentDocument) {
        return {
            rentId: rent._id.toHexString(),
            itemId: rent.item_id.toHexString(),
            startDate: rent.start_date,
            endDate: rent.end_date
        }
    }

    async getItemRentsByDate(itemId: string, startDate: Date, endDate: Date) {
        try {
            const result = await this.client.findOne<IRentDocument>({
                item_id: new ObjectId(itemId),
                start_date: { $lte: endDate },
                end_date: { $gte: startDate }
            });
            const rent = result ? this.IRentEntity(result) : null;     
            
            return new SuccessMessage<IRentResponse | null>(rent);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error getting rents');
        } 
    }


    async getRentByItemId(itemId: string) {
        try {
            const result = await this.client.findOne<IRentDocument>({
                item_id: new ObjectId(itemId),
            });
            const rent = result ? this.IRentEntity(result) : null;     
            
            return new SuccessMessage<IRentResponse | null>(rent);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error getting rents');
        } 
    }
    
    async rent(itemId: string, startDate: Date, endDate: Date) {
        try {
            const response = await this.client.insertOne({
                item_id: new ObjectId(itemId),
                start_date: startDate,
                end_date: endDate
            });

            const rent = this.IRentEntity({
                _id: response.insertedId,
                item_id: new ObjectId(itemId),
                start_date: startDate,
                end_date: endDate
            });

            return new SuccessMessage<IRentResponse>(rent);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error getting rents');
        } 
    }
    
    async delete(itemId: string) {
        try {
            const response = await this.client.findOneAndDelete({ item_id: new ObjectId(itemId) });
            if (!response) {
                return new ErrorMessage('Rent not found');
            }
            const rent = this.IRentEntity({
                _id: response._id,
                item_id: response.item_id,
                start_date: response.start_date,
                end_date: response.end_date
            });
            return new SuccessMessage<IRentResponse>(rent);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Delete rent error: ' + itemId );
        } 
    }
}

export default new RentRepository();