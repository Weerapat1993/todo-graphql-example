import { productResolvers } from './product';
import { todoResolvers } from './todo'

export const Mutation = {
  ...todoResolvers,
  ...productResolvers,
}