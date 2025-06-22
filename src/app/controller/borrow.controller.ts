import express, { NextFunction, Request, Response } from "express"
import { BorrowBook } from "../models/borrow.model";
export const borrowRoutes = express.Router();
borrowRoutes.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { book, quantity, dueDate } = req.body;
        await BorrowBook.borrowVerification(book, quantity)
        const result = await BorrowBook.create({ book, quantity, dueDate });
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        next(error)
    }
});

borrowRoutes.get("/", async (req, res) => {

    try {
        const allBooks = await BorrowBook.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            {
                $unwind: "$book"
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: allBooks
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
