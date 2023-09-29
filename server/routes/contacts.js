import {createContact, getContactsByUser, updateContact, deleteContact,getContactById,countContactsByUser} from '../controllers/contacts.js'
import protect from '../middlewares/protect.js'
import express from 'express'

const router = express.Router()

router.post('/create', protect, createContact)
router.get('/get', protect, getContactsByUser)
router.patch('/update/:id', protect, updateContact)
router.delete('/delete/:id', protect, deleteContact)
router.get('/:id', protect, getContactById)
router.get('/count/get',protect,countContactsByUser)


export default router;