import { BaseDatabase } from "./BaseDatabase";


export class RecipeDatabase extends BaseDatabase {
  public static TABLE_NAME = "Recipes"

  public async createRecipe(data: RecipeInput): Promise<void> {
    await this.setConnection()
      .raw(`INSERT INTO ${RecipeDatabase.TABLE_NAME} VALUES (
                "${data.id}", 
                "${data.title}", 
                "${data.description}", 
                ${data.createdAt}, 
                "${data.creatorUserId}")`
      )
  }

  public async getRecipesById(id: string): Promise<any> {
    const recipes = await this.setConnection()
      .select('*')
      .from(RecipeDatabase.TABLE_NAME)
      .where({ id })

    return recipes[0]
  }

  public async updateRecipe(id: string, title: string, description: string): Promise<void> {
    await this.setConnection().raw(`
      UPDATE ${RecipeDatabase.TABLE_NAME} SET title='${title}', description='${description}' 
      WHERE id='${id}' 
    `)
  }

  public async deleteRecipeById(id: string): Promise<void> {
    await this.setConnection().raw(`
      DELETE FROM ${RecipeDatabase.TABLE_NAME} WHERE id="${id}"
    `)
  }

  public async deleteRecipeCreatorId(id: string): Promise<void> {
    await this.setConnection().raw(`
      DELETE FROM ${RecipeDatabase.TABLE_NAME} WHERE creator_user_id="${id}"
    `)
  }
}


interface RecipeInput {
  id: string,
  title: string,
  description: string,
  createdAt: number,
  creatorUserId: string
}