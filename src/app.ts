import express, { Application, NextFunction, Request, Response } from "express"
import { bookRoutes } from "./app/controller/books.controller";
import { borrowRoutes } from "./app/controller/borrow.controller";
const app: Application = express()
app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes)
app.get("/", async (req: Request, res: Response) => {
    res.send('welcome to the library management system');
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = "Internal server error";
    if (error.name === "ValidationError") {
        statusCode = 400;
        message = "Validation Failed"
    }
    else if (error.code === 11000) {
        statusCode = 409;
        const field = Object.keys(error.keyValue)[0];
        const value = error.keyValue[field];
        message = `The ${field} '${value}' is already in use.`
    }
    else if (error.name === "CastError") {
        statusCode = 400;
        message = `The ${error.path} ${error.value} is not a valid input`
    }
    else {
        message = error.message
    }
    res.status(statusCode).json({
        message: message,
        success: false,
        error: error
    });
    next(error)
});



export default app