import {ProductModelServer,SanPhamModelServer} from './product.model';

export interface CartModelServer {
  total: number;
  data: [{
    product: SanPhamModelServer,
    numInCart: number
  }];
}

export interface CartModelPublic {
  total: number;
  prodData: [
    {
      id: number,
      incart: number
    }
  ];
}

export interface CartModelPublic1{
  total1: number;
  detail: [
    {
      sanpham: number,
      soluong: number
    }
  ];
}
 
export interface ctdhpublic{
  id: number;
  soluong:number;
  gia:number;
  sanpham: [
    {
      id: number,
      ten: string,
      giagoc:number,
      cover:string,
      soluong:number,
    }
  ];
}

