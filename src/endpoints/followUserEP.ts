import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { TokenManager } from '../services/TokenManager'
import { UserConnectionDatabase } from '../data/UserConnectionDatabase'


export const followUserEP = async (req: Request, res: Response) => {
  try {
    const followerToken = req.headers.authorization as string
    const followedId = req.body.userToFollowId

    if (!followedId || !followerToken) {
      throw new Error('Dados inválidos')
    }

    const tokenManager = new TokenManager()
    const followerId = tokenManager.retrieveDataFromToken(followerToken)

    const userConnectionDatabase = new UserConnectionDatabase()
    await userConnectionDatabase.follow(followerId, followedId)

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