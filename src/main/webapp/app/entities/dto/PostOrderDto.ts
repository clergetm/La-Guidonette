import { IUser } from '../user/user.model';
import { IOrderLine } from '../order-line/order-line.model';

export interface PostOrderDto {
  orderlines: IOrderLine[];
  user: IUser;
}
