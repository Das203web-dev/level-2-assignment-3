import { model, Schema } from "mongoose";
import { IBooks } from "../interface/books.interface";
import { BorrowBook } from "./borrow.model";

const booksSchema = new Schema<IBooks>({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true
    },
    genre: {
        type: String,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: 'Genre must be from those value : FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY'
        },
        required: [true, "Genre is required"]
    },
    isbn: {
        type: String,
        required: [true, "Must have to provide the ISBN"],
        unique: true
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    copies: {
        type: Number,
        required: [true, "Copies number is required"],
        min: [0, "Copies must be non-negative value"]
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
})
booksSchema.post("findOneAndUpdate", async function (doc, next) {
    console.log(doc);
    try {
        if (doc && doc.copies > 1) {
            doc.available = true
            await doc.save()
        }
        else {
            doc.available = false;
            await doc.save()
        }
        next()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        next(error)
    }
})
booksSchema.post("findOneAndDelete", async function (doc, next) {
    try {
        if (doc) {
            return await BorrowBook.deleteMany({ book: doc._id })
        }
        next()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        next(error)
    }
})

export const Book = model<IBooks>("Book", booksSchema)