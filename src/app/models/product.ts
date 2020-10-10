export class Product{
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    
    categoryId: number;
    categoryName: string;

    constructor(name: string, imgUrl: string, id: number)
    {
        this.name = name;
        this.imageUrl = imgUrl;
        this.id =- id;
    }
}