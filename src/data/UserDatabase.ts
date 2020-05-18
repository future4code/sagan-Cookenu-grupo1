import { BaseDatabase } from "./BaseDatabase";
import { UserConnectionDatabase } from "./UserConnectionDatabase";
import { RecipeDatabase } from "./RecipeDatabase";
import * as moment from 'moment'


export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "User"

  public async createUser(userData: UserDatas): Promise<void> {
    await this.setConnection()
      .insert(userData)
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

  public async getFeed(id: string): Promise<any> {
    const result = await this.setConnection()
      .raw(`SELECT r.id, r.title, r.description, r.created_at as createdAt, uc.followed_id as userId, u.name as userName 
                FROM ${RecipeDatabase.TABLE_NAME} r
                JOIN ${UserConnectionDatabase.TABLE_NAME} uc ON r.creator_user_id = uc.followed_id
                JOIN ${UserDatabase.TABLE_NAME} u ON uc.followed_id = u.id
                WHERE uc.follower_id = "${id}" 
                ORDER BY r.created_at DESC`)

    const newArray = result[0].map((recipe: { createdAt: number; }) => {
      return {
        ...recipe,
        createdAt: moment.unix(recipe.createdAt / 1000).format("DD/MM/YYYY")
      }
    })
    return newArray
  }

  public async deleteAccount(id:string): Promise<void> {
    await this.setConnection().raw(`
      DELETE FROM ${UserDatabase.TABLE_NAME} WHERE id="${id}"
    `)
  }
}

export interface UserDatas {
  id: string,
  email: string,
  password?: string,
  name: string
  role: string | undefined
}