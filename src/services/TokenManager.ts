import * as jwt from "jsonwebtoken"
import { UserDatas } from '../data/UserDatabase'


export class TokenManager {
  public generateToken(payload: any): string {
    return jwt.sign(
      payload,
      process.env.JWT_KEY as string,
      { expiresIn: process.env.JWT_EXPIRE_TIME }
    )
  }

  public retrieveDataFromToken(token: string): any {
    return jwt.verify(token, process.env.JWT_KEY as string)
  }
}

