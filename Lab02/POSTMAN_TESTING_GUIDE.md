# 🚀 Postman Testing Guide for Book Management API

## 📋 Prerequisites
1. **Install Postman**: Download from [postman.com](https://www.postman.com/)
2. **Start Server**: Run `node index.js` in your terminal
3. **Server URL**: `http://localhost:3000`

---

## 🧪 API Testing Patterns

### **1. GET /books - Get All Books**
```
Method: GET
URL: http://localhost:3000/books
Headers: None required
Body: None
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "Book One",
    "page": 100,
    "price": 10
  },
  {
    "id": 2,
    "name": "Book Two", 
    "page": 120,
    "price": 12
  }
  // ... more books
]
```

---

### **2. GET /books/:bookId - Get Book by ID**
```
Method: GET
URL: http://localhost:3000/books/1
Headers: None required
Body: None
```

**Expected Response (Success):**
```json
{
  "id": 1,
  "name": "Book One",
  "page": 100,
  "price": 10
}
```

**Expected Response (Not Found):**
```json
{
  "message": "Book not found"
}
```

---

### **3. POST /books - Create New Book**
```
Method: POST
URL: http://localhost:3000/books
Headers: 
  Content-Type: application/json
Body (raw JSON):
```

```json
{
  "id": 11,
  "name": "New Test Book",
  "page": 250,
  "price": 29.99
}
```

**Expected Response (Success - 201):**
```json
{
  "id": 11,
  "name": "New Test Book",
  "page": 250,
  "price": 29.99
}
```

**Expected Response (Error - 400):**
```json
{
  "message": "Missing book data"
}
```

**Expected Response (Error - 409):**
```json
{
  "message": "Book ID already exists"
}
```

---

### **4. PUT /books/:bookId - Update Book**
```
Method: PUT
URL: http://localhost:3000/books/1
Headers: 
  Content-Type: application/json
Body (raw JSON):
```

```json
{
  "name": "Updated Book Name",
  "page": 150,
  "price": 19.99
}
```

**Expected Response (Success):**
```json
{
  "id": 1,
  "name": "Updated Book Name",
  "page": 150,
  "price": 19.99
}
```

**Expected Response (Not Found - 404):**
```json
{
  "message": "Book not found"
}
```

---

### **5. DELETE /books/:bookId - Delete Book**
```
Method: DELETE
URL: http://localhost:3000/books/1
Headers: None required
Body: None
```

**Expected Response (Success):**
```json
{
  "message": "Book deleted"
}
```

**Expected Response (Not Found - 404):**
```json
{
  "message": "Book not found"
}
```

---

## 🔧 Postman Setup Steps

### **Step 1: Create New Collection**
1. Open Postman
2. Click "New" → "Collection"
3. Name it: `Book Management API`

### **Step 2: Create Environment Variables**
1. Click "Environments" → "New"
2. Name: `Book API Local`
3. Add variables:
   - `base_url`: `http://localhost:3000`
   - `book_id`: `1`

### **Step 3: Create Request Templates**

#### **Template 1: Get All Books**
- Method: `GET`
- URL: `{{base_url}}/books`
- Save as: `Get All Books`

#### **Template 2: Get Book by ID**
- Method: `GET`
- URL: `{{base_url}}/books/{{book_id}}`
- Save as: `Get Book by ID`

#### **Template 3: Create Book**
- Method: `POST`
- URL: `{{base_url}}/books`
- Headers: `Content-Type: application/json`
- Body: Raw JSON (use the JSON examples above)
- Save as: `Create New Book`

#### **Template 4: Update Book**
- Method: `PUT`
- URL: `{{base_url}}/books/{{book_id}}`
- Headers: `Content-Type: application/json`
- Body: Raw JSON (use the JSON examples above)
- Save as: `Update Book`

#### **Template 5: Delete Book**
- Method: `DELETE`
- URL: `{{base_url}}/books/{{book_id}}`
- Save as: `Delete Book`

---

## 🧪 Testing Scenarios

### **Scenario 1: Basic CRUD Operations**
1. **Create**: POST a new book with ID 999
2. **Read**: GET the book with ID 999
3. **Update**: PUT to modify the book
4. **Delete**: DELETE the book
5. **Verify**: GET should return 404

### **Scenario 2: Error Handling**
1. **Duplicate ID**: Try to POST a book with existing ID
2. **Missing Data**: POST with incomplete data
3. **Invalid ID**: GET/PUT/DELETE with non-existent ID

### **Scenario 3: Data Validation**
1. **Negative Price**: POST with negative price
2. **Zero Pages**: POST with 0 pages
3. **String ID**: POST with string ID instead of number

---

## 📱 Postman Tips & Tricks

### **1. Use Environment Variables**
- Change `base_url` to test different environments
- Use `book_id` to test different books

### **2. Save Responses**
- Save successful responses as examples
- Use them for future testing

### **3. Test Collections**
- Run entire collection at once
- Set up automated testing

### **4. Monitor Console**
- Check Postman console for detailed logs
- View request/response details

---

## 🚨 Common Issues & Solutions

### **Issue 1: "Cannot connect to server"**
- **Solution**: Make sure `node index.js` is running
- **Check**: `lsof -i:3000` in terminal

### **Issue 2: "404 Not Found"**
- **Solution**: Check URL spelling and server routes
- **Check**: Verify server is serving the correct endpoints

### **Issue 3: "Invalid JSON"**
- **Solution**: Validate JSON syntax in Body
- **Check**: Use JSON validator online

### **Issue 4: "CORS Error"**
- **Solution**: This API doesn't have CORS restrictions
- **Check**: If testing from browser, use Postman instead

---

## 🎯 Testing Checklist

- [ ] Server is running on port 3000
- [ ] All 5 API endpoints are accessible
- [ ] GET /books returns array of books
- [ ] POST /books creates new book successfully
- [ ] PUT /books/:id updates book successfully
- [ ] DELETE /books/:id deletes book successfully
- [ ] Error responses are correct (400, 404, 409)
- [ ] JSON responses are properly formatted
- [ ] All CRUD operations work end-to-end

---

## 🔗 Quick Test URLs

Copy these URLs directly into Postman:

```
GET    http://localhost:3000/books
GET    http://localhost:3000/books/1
POST   http://localhost:3000/books
PUT    http://localhost:3000/books/1
DELETE http://localhost:3000/books/1
```

Happy Testing! 🚀
