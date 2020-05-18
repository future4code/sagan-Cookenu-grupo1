import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { TokenManager } from '../services/TokenManager'
import { UserDatabase } from '../data/UserDatabase'
import { RecipeDatabase } from '../data/RecipeDatabase'

export const deleteRecipeEP = async (req: Request, res: Response) => {
  try {
    const retriviedData = new TokenManager()
      .retrieveDataFromToken(req.headers.authorization as string)

    const userData = await new UserDatabase().getUserById(retriviedData.id)

    if (!userData) {
      throw new Error('Faça login na sua conta antes de criar outras receitas')
    }

    const recipeId = req.params.id

    if (!recipeId) {
      throw new Error('Insira o id da receita buscada')
    }

    const recipeDataBase = new RecipeDatabase()
    const recipeData = await recipeDataBase.getRecipesById(recipeId)

    if (recipeData.creator_user_id !== userData.id && userData.role!=="admin") {
      throw new Error('Este perfil só pode apagar as próprias receitas')
    }

    await recipeDataBase.deleteRecipeById(recipeId)

    res.status(200).send({
      message: "Receita apagada com sucesso"
    })
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}