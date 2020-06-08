import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { TokenManager } from '../services/TokenManager'
import { UserDatabase } from '../data/UserDatabase'


export const getOwnProfileEP = async (req: Request, res: Response) => {
  try {
    const retriviedData = new TokenManager()
      .retrieveDataFromToken(req.headers.authorization as string)

    const userData = await new UserDatabase().getUserById(retriviedData.id)

    if (!userData) {
      throw new Error('Faça login na sua conta antes de procurar outros usuários')
    }

    res.status(200).send({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role
    })
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}