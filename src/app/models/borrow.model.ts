import { Model, model, Schema } from "mongoose";
import { IBorrow, IBorrowVerificationMethod } from "../interface/borrow.interface";
import { Book } from "./books.model";

const borrowBookSchema = new Schema<IBorrow, Model<IBorrow>, IBorrowVerificationMethod>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Must provide a book id"]
    },
    quantity: {
        type: Number,
        required: [true, "Must provide quantity"],
        min: [1, "Quantity must be non-negative value"]
    },
    dueDate: {
        type: Date,
        required: [true, "Must provide the return date"]
    }
}, {
    versionKey: false,
    timestamps: true
});
borrowBookSchema.static("borrowVerification",
    async function (bookId: string, quantity: number) {
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error("The book is not found")
        }
        if (book.copies < quantity) {
            throw new Error("Don't have enough copies")
        };
        const updatedQuantity = book.copies - quantity;
        const updatedBook = await Book.findOneAndUpdate(book?._id,
            {
                $set: {
                    copies: updatedQuantity,
                    available: updatedQuantity < 1 ? false : true
                }
            },
            {
                new: true, runValidators: true
            }
        )
        return updatedBook
    });



export const BorrowBook = model<IBorrow, IBorrowVerificationMethod>("BorrowBook", borrowBookSchema)