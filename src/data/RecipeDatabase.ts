import { BaseDatabase } from "./BaseDatabase";


export class RecipeDatabase extends BaseDatabase {
    private static TABLE_NAME = "Recipes"

    public async createRecipe(data: RecipeInput): Promise<void> {
        await this.setConnection()
            .raw(`INSERT INTO ${RecipeDatabase.TABLE_NAME} VALUES (
                "${data.id}", 
                "${data.title}", 
                "${data.descripton}", 
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
}


interface RecipeInput {
    id: string,
    title: string,
    descripton: string,
    createdAt: number,
    creatorUserId: string
}