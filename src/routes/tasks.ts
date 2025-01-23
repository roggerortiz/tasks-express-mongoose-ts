import TaskController from '@/controllers/TaskController'
import IdValidator from '@/validators/IdValidator'
import TaskValidator from '@/validators/TaskValidator'
import { Router } from 'express'

const router = Router()

router.get('/', TaskValidator.getTasks, TaskController.getAll)
router.get('/:id', IdValidator.id, TaskController.getById)
router.post('/', TaskValidator.saveTask, TaskController.create)
router.put('/:id', IdValidator.id, TaskValidator.saveTask, TaskController.update)
router.delete('/:id', IdValidator.id, TaskController.delete)

export default router
