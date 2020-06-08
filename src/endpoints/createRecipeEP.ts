import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { RecipeDatabase } from '../data/RecipeDatabase'
import * as moment from 'moment'
import { UserDatabase } from '../data/UserDatabase'


export const createRecipeEP = async (req: Request, res: Response) => {
  try {
    const retriviedData = new TokenManager()
    .retrieveDataFromToken(req.headers.authorization as string)

    const userData = await new UserDatabase().getUserById(retriviedData.id)

    if(!userData){
      throw new Error('Faça login na sua conta antes de criar outras receitas')
    }

    const recipeInputs = {
      id: new IdGenerator().generateId(),
      title: req.body.title,
      description: req.body.description,
      createdAt: moment.now(),
      creatorUserId: retriviedData.id
    }

    if (!recipeInputs.title || !recipeInputs.description){
      throw new Error('Insira um título e uma descrição para sua receita')
    }

    await new RecipeDatabase().createRecipe(recipeInputs)

    res.sendStatus(200)
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}