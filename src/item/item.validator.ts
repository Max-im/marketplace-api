import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { ParsedQs } from "qs";

type IErrors = Record<string, string>;

function checkString(key: string, value: string, errors: IErrors) {
    if (!errors[key] && (typeof value !== 'string' || validator.isEmpty(value))) {
        errors[key] = `"${key}" min length is 1`;
    }
}

function checkNumber(key: string, value: number, errors: IErrors) {
    if (!errors[key] && (typeof value !== 'number' || !validator.isNumeric(String(value)) || value < 0)) {
        errors[key] = `Invalid ${key}`;
    }
}

function cleanPriceQuery(value: string | ParsedQs | (string | ParsedQs)[] | undefined) {
    if (typeof value !== 'string' || !validator.isNumeric(value)) {
        return undefined;
    }
    return value;
}

function checkDate(key: string, value: string, errors: IErrors) {
    if (!errors[key] && (typeof value !== 'string' || validator.isEmpty(value)) || !validator.isISO8601(value)) {
        errors[key] = `"${key}" invalid date format`;
    }
}


class ItemValidator {
    createItem(req: Request, res: Response, next: NextFunction) {
        const errors: IErrors = {};              
        const requiredFields = ['name', 'description', 'price'];
        
        for(const field of requiredFields) {
            if (!req.body[field]) {
                errors[field] = `'${field}' field is required`;
            }
        }

        checkString('name', req.body.name, errors);
        checkString('description', req.body.description, errors);
        checkNumber('price', req.body.price, errors);

        if (Object.keys(errors).length) {
            res.status(400).json({ errors });
            return; 
        }
        next();
    }
    
    getItems(req: Request, res: Response, next: NextFunction) {      
        if ('name' in req.query) {
            if (typeof req.query.name !== 'string' || !validator.isAlphanumeric(req.query.name as string, 'en-US', { ignore: ' ' }) || validator.isEmpty(req.query.name)) {
                req.query.name = undefined;
            } else {
                req.query.name = validator.escape(req.query.name.trim().toLowerCase())
            }   
        }

        req.query.minPrice = cleanPriceQuery(req.query.minPrice);
        req.query.maxPrice = cleanPriceQuery(req.query.maxPrice);
        
        next();
    }
    
    isValidId(req: Request, res: Response, next: NextFunction) {        
        if (!validator.isMongoId(req.params.id)) {
            res.status(400).json({ errors: { id: 'Invalid id' } });
            return; 
        }

        next();
    }
    
    rentItem(req: Request, res: Response, next: NextFunction) {        
        const errors: IErrors = {};              
        const requiredFields = ['startDate', 'endDate'];
        
        for(const field of requiredFields) {
            if (!req.body[field]) {
                errors[field] = `'${field}' field is required`;
            }
        }

        checkDate('startDate', req.body.startDate, errors);
        checkDate('endDate', req.body.endDate, errors);

        if (!Object.keys(errors).length) {
            if (new Date(req.body.startDate) >= new Date(req.body.endDate)) {
                errors.startDate = 'Start date must be before end date';
            } else if (new Date(req.body.startDate) < new Date()) {
                errors.startDate = 'Start date must be in the future';
            } else if (new Date(req.body.endDate) < new Date()) {
                errors.endDate = 'End date must be in the future';
            }
        }

        if (Object.keys(errors).length) {
            res.status(400).json({ errors });
            return; 
        }

        next();
    }
}

export default new ItemValidator();