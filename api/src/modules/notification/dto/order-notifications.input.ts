import { InputType } from '@nestjs/graphql';
import { OrderByInput } from 'src/shared/dtos/order-by.input';

@InputType()
export class OrderNotificationsInput extends OrderByInput {}
