import dotenv from "dotenv"
import { AddressInfo } from "net"
import express from "express"
import { signupEP } from "./endpoints/signupEP"
import { loginEP } from "./endpoints/loginEP"
import { getOwnProfileEP } from "./endpoints/getOwnProfileEP"
import { getProfileByIdEP } from "./endpoints/getProfileByIdEP"
import { createRecipeEP } from "./endpoints/createRecipeEP"
import { getRecipeEP } from "./endpoints/getRecipeEP"
import { followUserEP } from "./endpoints/followUserEP"
import { unfollowUserEP } from "./endpoints/unfollowUserEP"
import { getRecipeFeedEP } from "./endpoints/getRecipeFeedEP"
import { deleteUserAccountEP } from "./endpoints/deleteUserAccountEP"
import { editeRecipeEP } from "./endpoints/editRecipeEP"
import { deleteRecipeEP } from "./endpoints/deleteRecipeEP"

dotenv.config()
const app = express()
app.use(express.json())

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
})

//User Endpoints
app.post("/signup", signupEP)
app.post('/login', loginEP)

app.get('/user/profile', getOwnProfileEP)
app.get('/user/feed', getRecipeFeedEP)
app.get('/user/:id', getProfileByIdEP)

app.delete('/user/:id', deleteUserAccountEP) 


//Recipes Endpoints
app.post('/recipe', createRecipeEP)

app.get('/recipe/:id', getRecipeEP)

app.put('/recipe/:id', editeRecipeEP) 

app.delete('/recipe/:id', deleteRecipeEP)

//UserConnections
app.post('/user/follow', followUserEP)
app.post('/user/unfollow', unfollowUserEP)