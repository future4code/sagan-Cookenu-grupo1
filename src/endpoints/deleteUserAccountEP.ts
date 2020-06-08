import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { TokenManager } from '../services/TokenManager'
import { UserDatabase } from '../data/UserDatabase'
import { RecipeDatabase } from '../data/RecipeDatabase'
import { UserConnectionDatabase } from '../data/UserConnectionDatabase'

export const deleteUserAccountEP = async (req: Request, res: Response) => {
  try {
    const retriviedData = new TokenManager()
      .retrieveDataFromToken(req.headers.authorization as string)

    const userDatabase = new UserDatabase()
    const userData = await userDatabase.getUserById(retriviedData.id)

    if (!userData || userData.role !== 'admin') {
      throw new Error('Credenciais inválidas')
    }

    const userToDeleteId = req.params.id

    if (!userToDeleteId) {
      throw new Error('Insira o id de usuário válido')
    }

    await new RecipeDatabase().deleteRecipeCreatorId(userToDeleteId)

    await new UserConnectionDatabase().deleteRelations(userToDeleteId)

    await userDatabase.deleteAccount(userToDeleteId)

    res.status(200).send({
      message: "Usuário obliterádo"
    })
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}