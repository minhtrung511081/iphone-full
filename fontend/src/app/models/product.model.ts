export interface ProductModelServer {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  images: string;
}

export interface SanPhamModelServer { 
  id: number;
  ten: string;
  giagoc: number;
  manhinh:string;
  cover: string;
  soluong: number;
  bonhotrong: string;
  loai:number
}

export interface ServerResponse {
  count: number;
  products: ProductModelServer[];
}
