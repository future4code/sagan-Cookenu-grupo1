import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { TokenManager } from '../services/TokenManager'
import { UserDatabase } from '../data/UserDatabase'


export const getProfileByIdEP = async (req: Request, res: Response) => {
  try {
    const seekedId = req.params.id

    const retriviedData = new TokenManager()
    .retrieveDataFromToken(req.headers.authorization as string)

    const userDatabase = new UserDatabase()
    const userData = await userDatabase.getUserById(retriviedData.id)

    if(!userData){
      throw new Error('Faça login na sua conta antes de procurar outros usuários')
    }
    if(!seekedId){
      throw new Error('Formato do id errado')
    }

    const seekedData = await userDatabase.getUserById(seekedId)

    res.status(200).send({
      id: seekedData.id,
      name: seekedData.name,
      email: seekedData.email,
      role:seekedData.role
    })
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}