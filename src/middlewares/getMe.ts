import asyncWrapper from "./asyncWrapper.middleware"
import { CustomRequest } from "../utils/customRequest"
import { Response, NextFunction } from "express"
import { getMe } from "../services/user.service"

const getMyUser = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    const me = await getMe(req.currentUser!.id)
    req.me = me
    next()
})

export default getMyUser