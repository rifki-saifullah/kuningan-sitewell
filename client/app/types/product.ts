export type CreateProductRequest = {
    name: string;
    description: string;
    stock: string;
    price: string;
};

export type UpdateProductRequest = {
    name: string;
    description: string;
    stock: string;
    price: string;
};

export type ProductResponse = {
    name: string;
    description: string;
    stock: string;
    price: string;
    image: string;
};