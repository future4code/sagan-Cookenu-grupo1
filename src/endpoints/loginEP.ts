import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { UserDatabase } from '../data/UserDatabase'
import { HashManager } from '../services/HashManager'
import { TokenManager } from '../services/TokenManager'


export const loginEP = async (req: Request, res: Response) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    }

    if (!data.email || !data.password) {
      throw new Error("Dados de cadastro inválidos")
    }

    const userData = await new UserDatabase().getUserByEmail(data.email)

    const isPasswordValid = await new HashManager().compareHash(data.password, userData.password)

    if (!isPasswordValid) {
      throw new Error('Email ou senha incorreta')
    }
 
    const token = new TokenManager().generateToken({
      id: userData.id,
      role: userData.role
    })

    res.status(200).send({ token })
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}