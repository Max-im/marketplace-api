import { ObjectId } from "mongodb";
import { getClient } from "../db";
import { SuccessMessage, ErrorMessage } from "../messages";
import { IRentResponse } from "../rent";


class HistoryRepository {
    private get client() {
        const collection = 'history';
        return getClient(collection);
    }

    async store(rent: IRentResponse) {
        try {
            await this.client.insertOne({
                rent_id: new ObjectId(rent.rentId),
                item_id: new ObjectId(rent.itemId),
                start_date: rent.startDate,
                end_date: rent.endDate,
                returned_date: new Date()
            });

            return new SuccessMessage<{success: boolean}>({success: true});
        } catch (e) {
            console.log(e);
            // EXTRA LOGGING FOR ADMIN
            return new ErrorMessage('Error storing history');
        } 
    }
}

export default new HistoryRepository();