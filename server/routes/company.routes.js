import express from 'express'

import { createCompany, deleteCompany, updateCompany, getAllCompanies, getCompanyDetail } 
from '../controllers/company.controller.js'

const router = express.Router()

router.route('/').get(getAllCompanies)
router.route('/:id').get(getCompanyDetail)
router.route('/').post(createCompany)
router.route('/:id').patch(updateCompany)
router.route('/:id').delete(deleteCompany)

export default router