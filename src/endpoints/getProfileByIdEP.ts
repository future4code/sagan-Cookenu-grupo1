import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { TokenManager } from '../services/TokenManager'
import { UserDatabase } from '../data/UserDatabase'


export const getProfileByIdEP = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization as string
    const seekedId = req.params.id

    const tokenManager = new TokenManager()
    const id = tokenManager.retrieveDataFromToken(authorization)

    const userDatabase = new UserDatabase()
    const researcherData = await userDatabase.getUserById(id)

    if(!researcherData){
      throw new Error('Faça login na sua conta antes de procurar outros usuários')
    }

    const seekedData = await userDatabase.getUserById(seekedId)

    res.status(200).send({
      id: seekedData.id,
      name: seekedData.name,
      email: seekedData.email
    })
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}