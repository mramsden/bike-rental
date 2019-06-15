export class ProductRepository {

    async getAll() {
        const response = await fetch('/products.json');
        return response.json();
    }
}
