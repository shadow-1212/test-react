  import Post from './Post';
  export default interface User{
      id?: number | null,
      username:string,
      password:string,
      email:string
      posts: [Post]| null
  }