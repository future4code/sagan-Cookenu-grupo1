import * as jwt from "jsonwebtoken"


export class TokenManager {
 public generateToken(payload: string): string {
     const token = jwt.sign(payload, process.env.JWT_KEY as string)
    return token
 }

 public verifyToken(): string {
     
 }

}