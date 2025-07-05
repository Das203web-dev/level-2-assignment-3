# Live Link
https://level-2-assignment-3-6lyx.onrender.com/

# Project setup
1. First install the packages . e.g : mongoos,express,typescript and other things
2. Edited the ts configue file for root and out directory selection
3. Then created folder structure
4. Then installed eslint to handle the errors

# API Details
# Books API

This section describes the available API endpoints for managing books.


## POST `/api/books`

Create a new book.  
- Request body: Book data (JSON)  
- Response: The created book data with success message


## GET `/api/books`

Get a list of books.  
- Query parameters (optional):  
  - `filter`: Filter by genre  
  - `sortBy`: Field to sort by  
  - `sort`: Sort order (`asc` or `desc`)  
  - `limit`: Number of books to return (default 10)  
- Response: List of books with success message


## GET `/api/books/:bookId`

Get details of a single book by its ID.  
- Path parameter: `bookId` (ID of the book)  
- Response: Book data if found; 404 if not found


## PUT `/api/books/:bookId`

Update an existing book by ID.  
- Path parameter: `bookId`  
- Request body: Fields to update  
- Response: Updated book data with success message


## DELETE `/api/books/:bookId`

Delete a book by ID.  
- Path parameter: `bookId`  
- Response: Success message on deletion


# Borrow API

This section describes the API endpoints for borrowing books and getting borrowed books summary.

## POST `/api/borrow`

Borrow a book by providing book ID, quantity, and due date.  
- Request body:  
  - `book`: ID of the book to borrow  
  - `quantity`: Number of copies to borrow  
  - `dueDate`: Return due date  
- Response: The borrowed book record with success message


## GET `/api/borrow`

Get a summary of borrowed books grouped by book, including total quantity borrowed for each.  
- Response: List of books with their title, ISBN, and total borrowed quantity
