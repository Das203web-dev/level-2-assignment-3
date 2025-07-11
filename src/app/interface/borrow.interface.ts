import { Model, Types } from "mongoose";

export interface IBorrow {
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date
}
export interface IBorrowVerificationMethod extends Model<IBorrow> {
    borrowVerification(bookId: string, quantity: number): Promise<object>
}