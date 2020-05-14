import { Request, Response } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'


export const signupEP = async (req: Request, res: Response) => {
    try {

    }
    catch (err) {

    }
    finally {
        await BaseDatabase.desconnectDB()
    }
}