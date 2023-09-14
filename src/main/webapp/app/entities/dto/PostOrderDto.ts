import { IProduct } from '../product/product.model';
import {IUser} from "../user/user.model";

export interface PostOrderDto {
  products: IProduct[];
  user : IUser
}
