import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { TokenManager } from '../services/TokenManager'
import { RecipeDatabase } from '../data/RecipeDatabase'
import * as moment from 'moment'


export const getRecipeEP = async (req: Request, res: Response) => {
  try {

    const userId = new TokenManager()
      .retrieveDataFromToken(req.headers.authorization as string)

    const recipe = await new RecipeDatabase().getRecipesById(req.params.id) 

    res.status(200).send({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      createdAt: moment.unix(recipe.created_at/1000).format("DD/MM/YYYY"),
    })
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}