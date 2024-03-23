export interface IAccState{
    id?:number;
    favorite:boolean;
    rated:{value:number}|false
    watchlist:boolean
}