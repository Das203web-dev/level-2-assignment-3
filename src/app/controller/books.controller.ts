import express, { NextFunction, Request, Response } from "express"
import { Book } from "../models/books.model";
export const bookRoutes = express.Router()

// problem 1 solution 
bookRoutes.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const result = await Book.create(body);
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
});

// problem 2 solution
bookRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { filter, sortBy, sort, limit } = req.query
        let result;
        const sortType = sort === 'asc' ? 1 : -1;
        const limitValue = limit ? parseInt(limit as string) : 10;
        if (filter) {
            result = await Book.find({ genre: filter }).sort({ [sortBy as string]: sortType }).limit(limitValue)
        }
        else {
            result = await Book.find();
            // result = await Book.find().limit(limitValue);
        }
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
});
// problem 3 solution 
bookRoutes.get("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const result = await Book.findById(bookId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "No book found",
                data: result
            })
        } else {

            res.status(200).json({
                success: true,
                message: "Book retrieved successfully",
                data: result
            })
        }
    } catch (error) {
        next(error)
    }
});
// problem 4 solution
bookRoutes.put("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookID = req.params.bookId;
        const body = req.body;
        const result = await Book.findOneAndUpdate({ _id: bookID }, body, { new: true, runValidators: true });
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
});
bookRoutes.delete("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookID = req.params.bookId;
        await Book.findOneAndDelete({ _id: bookID });
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        })
    } catch (error) {
        next(error)
    }
})