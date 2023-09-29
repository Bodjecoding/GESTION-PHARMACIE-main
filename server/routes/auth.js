import express from 'express'
import { register, login, countUsers} from '../controllers/auth.js'
import protect from '../middlewares/protect.js'

const router = express.Router()

router.post('/register',  register)
router.post('/login', login)
router.get('/count',countUsers)


export default router