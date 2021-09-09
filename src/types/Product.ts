import Post from './Post';

export default interface Product{
    id?: Number | null,
    label: string,
    description: string,
    imageUrl?: string,
    price: number,
    stock: Number,
    posts : [Post] | null
  }