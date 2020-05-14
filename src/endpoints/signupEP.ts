import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { UserDatabase } from '../data/UserDatabase'
import { TokenManager } from '../services/TokenManager'


export const signupEP = async (req: Request, res: Response) => {
    try {
        const data = {
            name: req.body.name, 
            email: req.body.email, 
            password: req.body.password
        }

        if(!data.name || !data.email || !data.password || (data.password.lenght < 6)) {
            throw new Error("Dados de cadastro inválidos")
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generateId()

        const hashManager = new HashManager()
        const hash = await hashManager.generateHash(data.password)

        const userDatabase = new UserDatabase()
        await userDatabase.createUser(id, data.email, hash, data.name)

        const tokenManager = new TokenManager()
        const token = tokenManager.generateToken(id)

        res.status(200).send({ token })

    }
    catch (err) {
        res.status(400).send({ message: err.message })
    }
    finally {
        await BaseDatabase.desconnectDB()
    }
}
