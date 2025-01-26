import { ObjectId } from "mongodb";
import { ParsedQs } from "qs";
import { getClient } from "../db";
import { IItem, IItemData, ItemDocument, SearchQuery } from "./item.type";
import { IMessage, SuccessMessage, ErrorMessage, NotFoundMessage } from "../messages";
import ResponseItemDto from "./dto/responseItem.dto";

class ItemRepository {
    private get client() {
        const collection = 'items';
        return getClient(collection);
    }

    private getIItem(item: ItemDocument) {
        return new ResponseItemDto({
            id: item._id.toString(),
            name: item.name,
            description: item.description,
            price: item.price,
        });
    }

    async create(dto: IItemData): Promise<IMessage<IItem>> {
        try {
            const response = await this.client.insertOne({ ...dto });
            const payload = new ResponseItemDto({ ...dto, id: response.insertedId.toString() });
            return new SuccessMessage<IItem>(payload, 201);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while creating');
        }
    }

    async search(queries: ParsedQs): Promise<IMessage<IItem[]>> {
        try {
            const searchQuery: SearchQuery = {};

            if (queries.name) {
                searchQuery.name = { $regex: queries.name as string, $options: 'i' };
            }
            if (queries.minPrice) {
                searchQuery.price = { ...searchQuery.price, $gte: parseFloat(queries.minPrice as string) };
            }
            if (queries.maxPrice) {
                searchQuery.price = { ...searchQuery.price, $lte: parseFloat(queries.maxPrice as string) };
            }

            const join = {
                from: "rents",
                localField: "_id",
                foreignField: "item_id",
                as: "rents",
            };
            
            const filter = {
                $or: [
                    { rents: { $eq: [] } },
                    { rents: { $exists: false } },
                ]
            };

            const result = await this.client
                .aggregate<ItemDocument>([
                    { $match: searchQuery },
                    { $lookup: join },
                    { $match: filter },
                ])
                .sort({ _id: 1 })
                .toArray();

            const items = result.map((item) => this.getIItem(item));

            return new SuccessMessage<IItem[]>(items);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while searching');
        }
    }

    async getItem(id: string): Promise<IMessage<IItem>> {
        try {
            const result = await this.client.findOne<ItemDocument>({ _id: new ObjectId(id) });
            if (!result) {
                return new NotFoundMessage('Item not found');
            }

            const item = this.getIItem(result);
            return new SuccessMessage<IItem>(item);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Item not found', 404);
        }
    }
}

export default new ItemRepository();