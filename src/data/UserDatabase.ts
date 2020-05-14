import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "User"

    public async createUser(id: string, email: string, password: string, name: string): Promise<void> {
        await this.setConnection()
            .insert({
                id,
                email,
                password,
                name
            })
            .into(UserDatabase.TABLE_NAME)
    }

    public async getUserByEmail(email: string): Promise<any> {
        const result = await this.setConnection().raw(`SELECT * FROM ${UserDatabase.TABLE_NAME} WHERE email = "${email}"`)
        return result[0][0]
    }

    public async getUserById(id: string): Promise<any> {
        const result = await this.setConnection().select('*').from(UserDatabase.TABLE_NAME).where({ id })
        return result[0]
    }
}