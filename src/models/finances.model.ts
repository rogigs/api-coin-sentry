import { User } from "../entities/user.entities";

export type FinanceModel = {
  id: string;
  title: string;
  operation: string;
  category: string;
  value_item: number;
  date_input: string;
  user: Pick<User, "id">;
};
