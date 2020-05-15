import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { RecipeDatabase } from '../data/RecipeDatabase'


export const createRecipeEP = async (req: Request, res: Response) => {
  try {
   
    await new RecipeDatabase().createRecipe({
      id: new IdGenerator().generateId(),
      title: req.body.title,
      descripton: req.body.description,
      createdAt: Date.now(),
      creatorUserId: new TokenManager()
      .retrieveDataFromToken(req.headers.authorization as string)
    })

    res.sendStatus(200)
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}