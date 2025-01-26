import { Request, Response } from 'express';
import itemRepository from './item.repository';
import CreateItemDto from './dto/createItem.dto';
import rentService from '../rent';
import RentItemDto from './dto/rentItem.dto';
import historyService from '../history';
import { IRentResponse } from '../rent';

class ItemController {
    createItem = async (req: Request, res: Response) => {
        const dto = new CreateItemDto(req.body);
        const result = await itemRepository.create(dto);
        res.status(result.code).send(result.payload);
    };

    getItems = async (req: Request, res: Response) => {
        const result = await itemRepository.search(req.query);
        res.status(result.code).send(result.payload);
    };
    
    rentItem = async (req: Request, res: Response) => {
        const itemId = req.params.id
        const dto = new RentItemDto({ itemId, ...req.body });
        
        // check if item exists
        const result = await itemRepository.getItem(itemId);
        if (result.error) {
            res.status(result.code).send(result.payload);
            return;
        }
        
        const rentItem = await rentService.rentItem(dto);
        if (rentItem.error) {
            res.status(rentItem.code).send(rentItem.payload);
            return;

        }

        res.status(rentItem.code).send(rentItem.payload);
    };
    
    returnItem = async (req: Request, res: Response) => {
        const itemId = req.params.id
        const result = await itemRepository.getItem(itemId);
        if (result.error) {
            res.status(result.code).send(result.payload);
            return;
        }
        const returnedItem = await rentService.returnItem(itemId);
        if (returnedItem.error) {
            res.status(returnedItem.code).send(returnedItem.payload);
            return;
        }
        const returned = returnedItem.payload as IRentResponse;

        await historyService.store(returned);

        res.status(returnedItem.code).send(returned);
    };
}

export default new ItemController();