import { UserEntity } from "./user.type.entity";

export type FinanceEntity = {
  id: string;
  title: string;
  operation: string;
  category: string;
  value_item: number;
  date_input: string;
  user: Pick<UserEntity, "id">;
};
