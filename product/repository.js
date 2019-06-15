export class ProductRepository {

    constructor() {
        this.baseUrl = '/products.json'
    }

    async getAll() {
        const response = await fetch(this.baseUrl);
        return response.json();
    }
}
