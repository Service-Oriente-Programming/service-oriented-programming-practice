# 📚 Book Management System

Hệ thống quản lý sách đơn giản với REST API và giao diện web đẹp mắt.

## 🚀 Cách sử dụng

### 1. Khởi động server
```bash
node index.js
```

### 2. Truy cập giao diện web
Mở trình duyệt và truy cập: `http://localhost:3000`

## ✨ Tính năng

### Giao diện web
- ✅ Thêm sách mới
- ✅ Xem danh sách tất cả sách
- ✅ Chỉnh sửa thông tin sách
- ✅ Xóa sách
- ✅ Giao diện responsive, đẹp mắt

### REST API Endpoints

#### GET /books
- Lấy danh sách tất cả sách
- **Response**: JSON array của tất cả sách

#### GET /books/:bookId
- Lấy thông tin sách theo ID
- **Response**: JSON object của sách hoặc 404 nếu không tìm thấy

#### POST /books
- Tạo sách mới
- **Body**: `{ "id": number, "name": "string", "page": number, "price": number }`
- **Response**: 201 với thông tin sách mới

#### PUT /books/:bookId
- Cập nhật thông tin sách
- **Body**: `{ "name": "string", "page": number, "price": number }`
- **Response**: JSON object của sách đã cập nhật

#### DELETE /books/:bookId
- Xóa sách theo ID
- **Response**: 200 với message "Book deleted"

## 🧪 Test API

### Cách 1: Sử dụng giao diện web (Khuyến nghị)
- Không cần cài đặt thêm gì
- Giao diện trực quan, dễ sử dụng
- Tự động refresh sau mỗi thao tác

### Cách 2: Sử dụng Postman
1. Cài đặt [Postman](https://www.postman.com/)
2. Tạo request với các endpoint trên
3. Test với các method: GET, POST, PUT, DELETE

### Cách 3: Sử dụng curl
```bash
# Lấy tất cả sách
curl http://localhost:3000/books

# Lấy sách theo ID
curl http://localhost:3000/books/1

# Thêm sách mới
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"id": 11, "name": "New Book", "page": 150, "price": 15.99}'

# Cập nhật sách
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Book", "page": 200, "price": 25.99}'

# Xóa sách
curl -X DELETE http://localhost:3000/books/1
```

### Cách 4: Sử dụng trình duyệt
- Mở Developer Tools (F12)
- Vào tab Console
- Sử dụng fetch API:
```javascript
// Lấy tất cả sách
fetch('/books').then(r => r.json()).then(console.log)

// Thêm sách mới
fetch('/books', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({id: 11, name: "Test Book", page: 100, price: 10})
})
```

## 📁 Cấu trúc project
```
Lab02/
├── books/
│   ├── book.js          # Class Book
│   └── bookManager.js   # Class quản lý sách
├── public/
│   └── index.html       # Giao diện web
├── index.js             # Server Express
├── package.json         # Dependencies
└── README.md            # Hướng dẫn sử dụng
```

## 🔧 Dependencies
- **Express.js**: Web framework
- **Node.js**: Runtime environment

## 💡 Lưu ý
- Server chạy trên port 3000
- Dữ liệu được lưu trong memory (sẽ mất khi restart server)
- Giao diện web responsive, hoạt động tốt trên mobile
- Có validation cơ bản cho dữ liệu đầu vào

## 🎯 Mục tiêu học tập
- Hiểu về REST API
- Thực hành CRUD operations
- Làm quen với Express.js
- Tích hợp frontend và backend
- Xử lý HTTP requests/responses
