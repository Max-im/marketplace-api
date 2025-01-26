import { IRentItemDto } from "../item";
import { ErrorMessage } from "../messages";
import rentRepository from "./rent.repository";
import { IRentResponse } from "./rent.type";

class RentService {
    async rentItem(dto: IRentItemDto) {
        const item = await rentRepository.getItemRentsByDate(dto.itemId, dto.startDate, dto.endDate);
        if (item.error) {
            return item as ErrorMessage;
        }
        if (item.payload) {
            return new ErrorMessage('Item is already rented');
        }
        
        return await rentRepository.rent(dto.itemId, dto.startDate, dto.endDate);
    }
    
    async returnItem(itemId: string) {
        const rent = await rentRepository.getRentByItemId(itemId);
        if (rent.error || !rent.payload) {
            return rent as ErrorMessage;
        }
        const rentData = rent.payload as IRentResponse;
        await rentRepository.delete(rentData.rentId);
        return rent;
    }
}

export default new RentService();