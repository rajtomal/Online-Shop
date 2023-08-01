export interface SignUp{
    name:string,
    email:string,
    password:string
}
export interface logIn{
    name:string,
    email:string,
    password:string
}
export interface products{
    name: string,
    model: string,
    price: number,
    category: string,
    color:string,
    imgUrl: string,
    description: string,
    id:number,
    seeMore:boolean,
    addCartQty: undefined | number
}
export interface userCartData{
    name: string,
    model: string,
    price: number,
    category: string,
    color:string,
    imgUrl: string,
    description: string,
    id:undefined | number,
    seeMore:boolean,
    addCartQty: undefined | number,
    productId: undefined | number,
    userId: undefined | number
}