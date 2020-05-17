import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { UserDatabase, UserDatas } from '../data/UserDatabase'
import { TokenManager } from '../services/TokenManager'


export const signupEP = async (req: Request, res: Response) => {
  try {
    const data: UserDatas = {
      id: '',
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'normal'
    }

    if (!data.name || !data.email || !data.password || data.password.length < 6) {
      throw new Error("Dados de cadastro inválidos")
    }

    data.id = new IdGenerator().generateId()

    data.password = await new HashManager().generateHash(data.password)

    await new UserDatabase().createUser(data)
 
    const token = new TokenManager().generateToken({
      id: data.id,
      role: data.role,
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
