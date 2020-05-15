import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { TokenManager } from '../services/TokenManager'
import { UserDatabase } from '../data/UserDatabase'


export const getOwnProfileEP = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization as string

    const tokenManager = new TokenManager()
    const id = tokenManager.retrieveDataFromToken(authorization)

    const userDatabase = new UserDatabase()
    const userData = await userDatabase.getUserById(id)


    res.status(200).send({
      id: userData.id,
      name: userData.name,
      email: userData.email
    })

  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}