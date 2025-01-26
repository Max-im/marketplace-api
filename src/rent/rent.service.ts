import { IRentItemDto } from "../item";
import { ErrorMessage } from "../messages";
import rentRepository from "./rent.repository";

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
        return await rentRepository.delete(itemId);
    }
}

export default new RentService();