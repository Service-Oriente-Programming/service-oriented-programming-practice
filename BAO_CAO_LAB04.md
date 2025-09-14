# BÁO CÁO LAB 04: DRUG MONITOR PROJECT
**Sinh viên:** Tran Thi Thanh Thao  
**Môn học:** Service-Oriented Programming Practice  
**Ngày:** 14/09/2025

---

## 📋 **TỔNG QUAN DỰ ÁN**

Dự án Drug Monitor là một ứng dụng web quản lý thuốc được xây dựng bằng Node.js, Express, MongoDB với kiến trúc MVC. Ứng dụng cho phép người dùng thêm, sửa, xóa thuốc và tính toán số lượng cần mua.

---

## 🔍 **PHẦN 1: DISCOVERY PROJECT STRUCTURE**

### **1.1. Thay đổi tác giả trong package.json**

**Trước khi thay đổi:**
```json
"author": "Thanh Thao",
```

**Sau khi thay đổi:**
```json
"author": "Tran Thi Thanh Thao",
```

**Hình ảnh minh họa:**
```
📁 drug-monitor/
├── 📄 package.json (✅ Đã cập nhật author)
├── 📁 server/
├── 📁 views/
└── 📁 assets/
```

### **1.2. Xóa file không cần thiết**

**File đã xóa:**
- `views/includes/_list.ejs.html` (file không sử dụng)

**Kết quả:**
```
📁 views/includes/
├── 📄 _header.ejs
├── 📄 _footer.ejs
└── ❌ _list.ejs.html (đã xóa)
```

### **1.3. Tạo file .env.example**

**Nội dung file .env.example:**
```env
# MongoDB Connection String
MONGO_STR=mongodb://localhost:27017/drug-monitor

# Server Configuration
PORT=3100
BASE_URI=http://localhost
```

---

## 📦 **PHẦN 2: CÀI ĐẶT VÀ CẤU HÌNH**

### **2.1. Cài đặt dependencies**

**Lệnh thực hiện:**
```bash
npm install
```

**Kết quả:**
```
added 1 package, removed 10 packages, changed 1 package, and audited 443 packages in 3s
```

**Dependencies chính:**
- express: ^4.18.1
- mongoose: ^6.3.8
- ejs: ^3.1.8
- body-parser: ^1.20.0
- dotenv: ^16.0.1

### **2.2. Cấu hình MongoDB**

**File .env:**
```env
MONGO_STR=mongodb://localhost:27017/drug-monitor
PORT=3100
BASE_URI=http://localhost
```

**Khởi động MongoDB:**
```bash
brew services start mongodb-community@6.0
```

---

## 🚀 **PHẦN 3: CHẠY ỨNG DỤNG**

### **3.1. Khởi động ứng dụng**

**Lệnh:**
```bash
npm start
```

**Kết quả terminal:**
```
[nodemon] starting `node server.js`
listening on 3100
Welcome to the Drug Monitor App at http://localhost:3100
Database successfully connected at localhost
```

### **3.2. Kiểm tra API endpoints**

**Test với curl:**
```bash
curl -I http://localhost:3100
# HTTP/1.1 200 OK

curl -s http://localhost:3100/api/drugs
# [] (mảng rỗng - chưa có dữ liệu)
```

---

## 🔧 **PHẦN 4: UPGRADE PROJECT**

### **4.1. Sửa chức năng Delete Drug**

**Vấn đề:** URL sử dụng `https://` thay vì `http://`

**File:** `assets/js/main.js`

**Trước:**
```javascript
"url" : `https://${url}/api/drugs/${id}`,
```

**Sau:**
```javascript
"url" : `http://${url}/api/drugs/${id}`,
```

### **4.2. Sửa chức năng Update Drug**

**File:** `assets/js/main.js`

**Trước:**
```javascript
"url" : `https://${url}/api/drugs/${data.id}`,
```

**Sau:**
```javascript
"url" : `http://${url}/api/drugs/${data.id}`,
```

### **4.3. Tạo Middleware Validation**

**File mới:** `server/middleware/validation.js`

```javascript
const validateDrugInput = (req, res, next) => {
    const { name, dosage, card, pack, perDay } = req.body;
    const errors = [];

    // Validate name - must be more than 5 characters
    if (!name || name.length <= 5) {
        errors.push('Name must be more than 5 characters');
    }

    // Validate dosage - format: XX-morning,XX-afternoon,XX-night
    const dosagePattern = /^\d+-morning,\d+-afternoon,\d+-night$/;
    if (!dosage || !dosagePattern.test(dosage)) {
        errors.push('Dosage must follow format: XX-morning,XX-afternoon,XX-night');
    }

    // Validate card - must be more than 1000
    if (!card || isNaN(card) || parseInt(card) <= 1000) {
        errors.push('Card must be more than 1000');
    }

    // Validate pack - must be more than 0
    if (!pack || isNaN(pack) || parseInt(pack) <= 0) {
        errors.push('Pack must be more than 0');
    }

    // Validate perDay - must be more than 0 and less than 90
    if (!perDay || isNaN(perDay) || parseInt(perDay) <= 0 || parseInt(perDay) >= 90) {
        errors.push('PerDay must be more than 0 and less than 90');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    next();
};
```

**Áp dụng vào routes:**
```javascript
// server/routes/routes.js
route.post('/api/drugs', validateDrugInput, controller.create);
route.put('/api/drugs/:id', validateDrugInput, controller.update);
```

### **4.4. Tạo Error Handlers**

**File mới:** `server/middleware/errorHandler.js`

```javascript
// 404 handler for undefined routes
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Global error handler
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Mongoose bad ObjectId
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = 'Resource not found';
        statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        message = 'Duplicate field value entered';
        statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map(val => val.message).join(', ');
        statusCode = 400;
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};
```

**Tích hợp vào server.js:**
```javascript
// Error handling middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);
```

### **4.5. Hoàn thiện Purchase Function**

**Cải tiến file:** `assets/js/main.js`

```javascript
if(window.location.pathname == "/purchase"){
    $("#purchase_table").hide();

    $("#drug_days").submit(function(event){
        event.preventDefault();
        $("#purchase_table").show();
        let days = +$("#days").val();
        
        // Update the table with new calculations
        updatePurchaseTable(days);
        alert("Drugs for " + days + " days!");
    })

    function updatePurchaseTable(days) {
        let drugs = window.drugsData || [];
        
        $("#purchase_table tbody tr").each(function(index) {
            if (drugs[index]) {
                let drug = drugs[index];
                let pills = days * drug.perDay;
                let cardsToBuy = Math.ceil(pills / drug.card);
                let packsToBuy = Math.ceil(pills / drug.pack);
                let cardsPerPack = drug.pack / drug.card;
                
                $(this).find("td:eq(2)").html(cardsToBuy + " (" + cardsPerPack.toFixed(1) + " " + (cardsPerPack < 2 ? "card" : "cards") + " per pack)");
                $(this).find("td:eq(3)").html(packsToBuy);
            }
        });
    }
}
```

**Cập nhật view:** `views/purchase.ejs`

```html
<script>
    // Pass drugs data to JavaScript
    window.drugsData = <%- JSON.stringify(drugs) %>;
</script>
```

---

## 📊 **PHẦN 5: KIỂM TRA VÀ TEST**

### **5.1. Test API với POSTMAN**

**Endpoints đã test:**
- `GET /api/drugs` - ✅ 200 OK
- `POST /api/drugs` - ✅ Với validation
- `PUT /api/drugs/:id` - ✅ Với validation  
- `DELETE /api/drugs/:id` - ✅ Hoạt động

### **5.2. Test Web Interface**

**Các trang đã test:**
- `http://localhost:3100/` - ✅ Trang chủ
- `http://localhost:3100/manage` - ✅ Quản lý thuốc
- `http://localhost:3100/add-drug` - ✅ Thêm thuốc
- `http://localhost:3100/purchase` - ✅ Tính toán mua thuốc
- `http://localhost:3100/dosage` - ✅ Kiểm tra liều lượng

### **5.3. Log Terminal**

**Kết quả log:**
```
GET / 200 5015 - 5.309 ms
GET /api/drugs 200 2 - 4.017 ms
GET /manage 200 5310 - 8.682 ms
GET /purchase 200 5446 - 9.398 ms
```

---

## 🔄 **PHẦN 6: HIỂU CODE WORKFLOW**

### **6.1. Kiến trúc MVC**

```
📁 server/
├── 📁 model/        # Data models (M)
├── 📁 controller/   # Business logic (C)  
├── 📁 views/        # Templates (V)
├── 📁 routes/       # API endpoints
├── 📁 services/     # Service layer
├── 📁 database/     # DB connection
└── 📁 middleware/   # Custom middleware
```

### **6.2. Luồng xử lý request**

```
User Request → Routes → Middleware → Controller → Model → Database
                ↓
Response ← Views ← Services ← Controller ← Model ← Database
```

### **6.3. Database Schema**

```javascript
// server/model/model.js
let schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    dosage: { type: String, required: true },
    card: { type: Number, required: true },
    pack: { type: Number, required: true },
    perDay: { type: Number, required: true, unique: true }
});
```

---

## 💾 **PHẦN 7: COMMIT CHANGES**

### **7.1. Git Status**

```bash
git add .
git commit -m "Complete drug monitor project upgrades

- Changed author to Tran Thi Thanh Thao in package.json
- Deleted unnecessary _list.ejs.html file
- Created .env.example with MongoDB configuration
- Fixed delete and update drug functions (changed https to http)
- Added input validation middleware for:
  - Name length > 5 characters
  - Dosage format: XX-morning,XX-afternoon,XX-night
  - Card > 1000
  - Pack > 0
  - PerDay > 0 and < 90
- Added comprehensive error handling middleware
- Enhanced purchase function with dynamic calculations
- Updated routes to use validation middleware
- Improved error handling in server.js"
```

### **7.2. Kết quả commit**

```
[master d922618] Complete drug monitor project upgrades
 10 files changed, 5569 insertions(+), 2579 deletions(-)
 create mode 100644 server/middleware/errorHandler.js
 create mode 100644 server/middleware/validation.js
 delete mode 100644 views/includes/_list.ejs.html
```

---

## ✅ **KẾT QUẢ CUỐI CÙNG**

### **Tất cả yêu cầu đã hoàn thành:**

1. ✅ **Discovery project structure** - Đã khám phá và hiểu cấu trúc
2. ✅ **Change author name** - Đã đổi thành "Tran Thi Thanh Thao"
3. ✅ **Delete unnecessary files** - Đã xóa `_list.ejs.html`
4. ✅ **Create .env.example** - Đã tạo file cấu hình mẫu
5. ✅ **Install dependencies** - `npm install` thành công
6. ✅ **Configure MongoDB** - Đã cấu hình kết nối
7. ✅ **Run application** - Ứng dụng chạy trên port 3100
8. ✅ **Fix delete function** - Đã sửa URL từ https → http
9. ✅ **Fix update function** - Đã sửa URL từ https → http
10. ✅ **Input validation** - Middleware validation toàn diện
11. ✅ **Error handlers** - Xử lý lỗi chuyên nghiệp
12. ✅ **Purchase function** - Tính toán động hoàn chỉnh
13. ✅ **Commit changes** - Đã commit tất cả thay đổi

### **Ứng dụng hoạt động:**
- 🌐 **Web Interface:** http://localhost:3100
- 🔌 **API Endpoints:** Tất cả CRUD operations
- 🗄️ **Database:** MongoDB kết nối thành công
- ✅ **Validation:** Input validation mạnh mẽ
- 🛡️ **Error Handling:** Xử lý lỗi toàn diện

---

**Dự án đã hoàn thành 100% và sẵn sàng sử dụng!**

*Báo cáo được tạo bởi: Tran Thi Thanh Thao*  
*Ngày: 14/09/2025*
