import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { TokenManager } from '../services/TokenManager'
import { UserDatabase } from '../data/UserDatabase'
import { RecipeDatabase } from '../data/RecipeDatabase'

export const editeRecipeEP = async (req: Request, res: Response) => {
  try {
    const retriviedData = new TokenManager()
      .retrieveDataFromToken(req.headers.authorization as string)

    if (retriviedData.role !== 'normal') {
      throw new Error('Apenas usuários comuns podem alterar receita')
    }

    const userData = await new UserDatabase().getUserById(retriviedData.id)

    if (!userData) {
      throw new Error('Faça login na sua conta antes de criar outras receitas')
    }

    const recipeInputs = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description
    }
    if (!recipeInputs.id) {
      throw new Error('Insira o id da receita buscada')
    }

    if (!recipeInputs.title && !recipeInputs.description) {
      throw new Error('É necessário enviar um title e/ou description')
    }

    const recipeDataBase = new RecipeDatabase()
    const recipeData = await recipeDataBase.getRecipesById(recipeInputs.id)

    if (recipeData.creator_user_id !== userData.id) {
      throw new Error('Só é permitido alterar as próprias receitas')
    }

    await recipeDataBase.updateRecipe(
      recipeInputs.id,
      recipeInputs.title || recipeData.title,
      recipeInputs.description || recipeData.description
    )

    res.status(200).send({
      message: "Atualizado com sucesso"
    })
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }
  finally {
    await BaseDatabase.desconnectDB()
  }
}