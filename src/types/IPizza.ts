
export interface IPizza {
    category: number,
    id: string,
    imageUrl: string,
    price: number,
    rating: number,
    sizes: number[],
    title: string,
    types: number[],
    count?: number
}

export interface CountAndPizzas {
    count: number,
    items: IPizza[]
}