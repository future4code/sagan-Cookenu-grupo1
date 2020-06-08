import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { UserDatabase } from '../data/UserDatabase'
import { TokenManager } from '../services/TokenManager'


export const getRecipeFeedEP = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string

    const retriviedData = new TokenManager().retrieveDataFromToken(token)

    const userData = await new UserDatabase().getUserById(retriviedData.id)

    if (!userData) {
      throw new Error('Faça login na sua conta antes de criar outras receitas')
    }

    const recipesArray = await new UserDatabase().getFeed(userData.id)

    res.status(200).send({
      recipes: recipesArray
    })
  }
  catch (err) {
    res.status(400).send({ message1: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}