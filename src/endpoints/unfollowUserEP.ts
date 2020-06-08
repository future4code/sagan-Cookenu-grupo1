import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { TokenManager } from '../services/TokenManager'
import { UserConnectionDatabase } from '../data/UserConnectionDatabase'
import { UserDatabase } from '../data/UserDatabase'


export const unfollowUserEP = async (req: Request, res: Response) => {
  try {
    const followerToken = req.headers.authorization as string
    const unfollowedId = req.body.userToUnfollowId

    if (!unfollowedId || !followerToken) {
      throw new Error('Dados inválidos')
    }

    const followerRetriviedData = new TokenManager().retrieveDataFromToken(followerToken)

    const userDatabase = new UserDatabase()
    const followerData = await userDatabase.getUserById(followerRetriviedData.id)
    const unfollowedData = await userDatabase.getUserById(unfollowedId)

    if (!followerData || !unfollowedData) {
      throw new Error('Usuário não encontrado')
    }

    await new UserConnectionDatabase().unfollow(followerData.id, unfollowedData.id)

    res.status(200).send({
      message: "Unfollowed successfully"
    })
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}