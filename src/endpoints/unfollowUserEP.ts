import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { TokenManager } from '../services/TokenManager'
import { UserConnectionDatabase } from '../data/UserConnectionDatabase'


export const unfollowUserEP = async (req: Request, res: Response) => {
    try {
      const followerToken = req.headers.authorization as string
      const unfollowedId = req.body.userToUnfollowId
  
      if (!unfollowedId || !followerToken) {
        throw new Error('Dados inválidos')
      }
  
      const followerId = new TokenManager().retrieveDataFromToken(followerToken)
  
      await new UserConnectionDatabase().unfollow(followerId, unfollowedId)
  
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