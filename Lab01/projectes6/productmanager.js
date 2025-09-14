const Product = require('./product');

class ProductManager {
    constructor() {
        this.products = [];
    }

    // Create
    addProduct(product) {
        this.products.push(product);
    }

    // Read all
    getAllProducts() {
        return this.products;
    }

    // Read by code
    getProductByCode(code) {
        return this.products.find(p => p.code === code);
    }

    // Update
    updateProduct(code, updatedFields) {
        const product = this.getProductByCode(code);
        if (product) {
            Object.assign(product, updatedFields);
            return true;
        }
        return false;
    }

    // Delete
    deleteProduct(code) {
        const index = this.products.findIndex(p => p.code === code);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = ProductManager;