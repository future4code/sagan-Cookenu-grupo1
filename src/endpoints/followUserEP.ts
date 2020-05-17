import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { TokenManager } from '../services/TokenManager'
import { UserConnectionDatabase } from '../data/UserConnectionDatabase'
import { UserDatabase } from '../data/UserDatabase'


export const followUserEP = async (req: Request, res: Response) => {
  try {
    const followerToken = req.headers.authorization as string
    const followedId = req.body.userToFollowId

    if (!followedId || !followerToken) {
      throw new Error('Dados inválidos')
    }

    const followerRetriviedData = new TokenManager().retrieveDataFromToken(followerToken)

    const userDatabase = new UserDatabase()
    const followerData = await userDatabase.getUserById(followerRetriviedData.id)
    const followedData = await userDatabase.getUserById(followedId)
    
    if (!followerData || !followedData) {
      throw new Error('Usuário não encontrado')
    }

    await new UserConnectionDatabase().follow(followerData.id, followedData.id)

    res.status(200).send({
      message: "Followed successfully"
    })
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}