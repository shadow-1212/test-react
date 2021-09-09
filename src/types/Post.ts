  import Product from './Product';
  import User from './User';


  export default interface Post{
      id:number |    null,
      content:string,
      user : User,
      userId: number,
      product: Product,
      productId: number
  }