import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { UserDatabase } from '../data/UserDatabase'
import { TokenManager } from '../services/TokenManager'


export const getRecipeFeedEP = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string

        const userId = new TokenManager().retrieveDataFromToken(token)

        const recipesArray = await new UserDatabase().getFeed(userId)

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