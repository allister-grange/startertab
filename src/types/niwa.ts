export interface NiwaResponse {
  products: (ProductsEntity)[];
  coord: string;
}
export interface ProductsEntity {
  values: (ValuesEntity)[];
  name: string;
}
export interface ValuesEntity {
  time: string;
  value: number;
}
export interface TransformedNiwaData {
  time: string;
  cloudy: number;
  sunny: number;
}