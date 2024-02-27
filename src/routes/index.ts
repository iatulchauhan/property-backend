"use strict"
import { Router } from 'express'
// import { userType } from '../common/dbTypes'
import { userRouter } from './user'
import { adminRouter } from './admin'
import { uploadRouter } from './upload'

const router = Router()
router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/upload', uploadRouter)



export { router }