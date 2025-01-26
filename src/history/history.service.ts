import { IRentResponse } from "../rent";
import historyRepository from "./history.repository";

class HistoryService {
    async store(rent: IRentResponse) {
        return await historyRepository.store(rent);
    }
}

export default new HistoryService();