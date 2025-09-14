const readline = require('readline');
const Product = require('./product');
const ProductManager = require('./productmanager');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const manager = new ProductManager();

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

function showMenu() {
    console.log('\n--- Product Manager ---');
    console.log('1. Add Product');
    console.log('2. View All Products');
    console.log('3. Update Product');
    console.log('4. Delete Product');
    console.log('5. Show name, total price of product by code');
    console.log('6. Find and show all products by name');
    console.log('7. Set out of stock for product by code');
    console.log('8. List all products which are out of stock');
    console.log('9. Exit');
}

async function addProduct() {
    const code = await askQuestion('Enter product code: ');
    const name = await askQuestion('Enter product name: ');
    const price = await askQuestion('Enter product price: ');
    const quantity = await askQuestion('Enter product quantity: ');
    const product = new Product(code, name, parseFloat(price), parseInt(quantity));
    if(manager.getProductByCode(code)) {
        console.log('Product code already exists.');
        return;
    }
    manager.addProduct(product);
    console.log('Product added successfully.');
}

async function viewProducts() {
    const products = manager.getAllProducts();
    if (products.length === 0) {
        console.log('No products found.');
    } else {
        console.log('\nProduct List:');
        products.forEach(p => {
            console.log(`Code: ${p.code}, Name: ${p.name}, Price: ${p.price}, Quantity: ${p.quantity}`);
        });
    }
}

async function updateProduct() {
    const code = await askQuestion('Enter product code to update: ');
    const product = manager.getProductByCode(code);
    if (!product) {
        console.log('Product not found.');
        return;
    }
    const name = await askQuestion('Enter new name (leave blank to keep current): ');
    const price = await askQuestion('Enter new price (leave blank to keep current): ');
    const quantity = await askQuestion('Enter new quantity (leave blank to keep current): ');
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (price) updatedFields.price = parseFloat(price);
    if (quantity) updatedFields.quantity = parseInt(quantity);
    manager.updateProduct(code, updatedFields);
    console.log('Product updated successfully.');
}

async function deleteProduct() {
    const code = await askQuestion('Enter product code to delete: ');
    if (manager.deleteProduct(code)) {
        console.log('Product deleted successfully.');
    } else {
        console.log('Product not found.');
    }
}

async function showTotalPriceByCode() {
    const code = await askQuestion('Enter product code: ');
    const product = manager.getProductByCode(code);
    if (product) {
        console.log(`Name: ${product.name}, Total Price: ${product.getTotalPrice()}`);
    } else {
        console.log('Product not found.');
    }
}

async function findProductsByName() {
    const keyword = await askQuestion('Enter product name keyword: ');
    const products = manager.getAllProducts().filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
    if (products.length === 0) {
        console.log('No products found.');
    } else {
        products.forEach(p => {
            console.log(`Code: ${p.code}, Name: ${p.name}, Price: ${p.price}, Quantity: ${p.quantity}`);
        });
    }
}

async function setOutOfStockByCode() {
    const code = await askQuestion('Enter product code to set out of stock: ');
    const product = manager.getProductByCode(code);
    if (product) {
        product.quantity = 0;
        console.log('Product set to out of stock.');
    } else {
        console.log('Product not found.');
    }
}

async function listOutOfStockProducts() {
    const products = manager.getAllProducts().filter(p => p.quantity === 0);
    if (products.length === 0) {
        console.log('No out of stock products.');
    } else {
        products.forEach(p => {
            console.log(`Code: ${p.code}, Name: ${p.name}, Price: ${p.price}, Quantity: ${p.quantity}`);
        });
    }
}

async function promptMenu() {
    showMenu();
    const answer = await askQuestion('Choose an option (1-9): ');
    switch (answer.trim()) {
        case '1':
            await addProduct();
            break;
        case '2':
            await viewProducts();
            break;
        case '3':
            await updateProduct();
            break;
        case '4':
            await deleteProduct();
            break;
        case '5':
            await showTotalPriceByCode();
            break;
        case '6':
            await findProductsByName();
            break;
        case '7':
            await setOutOfStockByCode();
            break;
        case '8':
            await listOutOfStockProducts();
            break;
        case '9':
            rl.close();
            return;
        default:
            console.log('Invalid option. Please try again.');
    }
    await promptMenu();
}
promptMenu();