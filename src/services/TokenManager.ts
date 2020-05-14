import * as jwt from "jsonwebtoken"


export class TokenManager {
    public generateToken(payload: string): string {
        const token = jwt.sign(payload, process.env.JWT_KEY as string)
        return token
    }

    public retrieveDataFromToken(token: string): any {
        const data = jwt.verify(token, process.env.JWT_KEY as string)
        return data
    }
}