import { Injectable } from "@nestjs/common";
import { Account } from "./models/account.model";

@Injectable()
export class AccountService {

  findAccount(id: string): Account {
    return {} as any;
  }

}