import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'

export const deleteUserAccountEP = async (req: Request, res: Response) => {
  try {
      
      res.status(200).send({  })

  }
  catch (err) {
      res.status(400).send({ message: err.message })
  }
  finally {
      await BaseDatabase.desconnectDB()
  }
}