class Product {
    constructor(code, name, price, quantity) {
        this.code = code;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.price * this.quantity;
    }

    getDetails() {
        return `Code: ${this.code}, Name: ${this.name}, Price: ${this.price}, Quantity: ${this.quantity}`;
    }

    setOutOfStock() {
        this.quantity = 0;
    }
}

module.exports = Product;