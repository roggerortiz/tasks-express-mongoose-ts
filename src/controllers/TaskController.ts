import TaskService from '@/database/services/TaskService'
import RequestHelper from '@/helpers/RequestHelper'
import ResponseStatus from '@/types/enums/ResponseStatus'
import NotFoundError from '@/types/errors/NotFoundError'
import { CreateTask, Task, UpdateTask } from '@/types/models/Task'
import Pager from '@/types/pagination/Pager'
import Paging from '@/types/pagination/Paging'
import { GetTasks } from '@/types/request/GetTasks'
import { Request } from '@/types/request/Request'
import { NextFunction, Response } from 'express'

export default class TaskController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    /*
      #swagger.tags = ['Task']
      #swagger.security = [{
        'bearerAuth': []
      }]
      #swagger.parameters['page_size'] = {
        in: 'query',
        type: 'number'
      }
      #swagger.parameters['page_index'] = {
        in: 'query',
        type: 'number'
      }
      #swagger.parameters['sort_field'] = {
        in: 'query',
        type: 'string'
      }
      #swagger.parameters['sort_direction'] = {
        in: 'query',
        type: 'string'
      }
      #swagger.parameters['free_text'] = {
        in: 'query',
        type: 'string'
      }
      #swagger.parameters['important'] = {
        in: 'query',
        type: 'boolean'
      }
      #swagger.responses[200] = {
        content: {
          'application/json': {
            schema:{
              type: 'array',
              items: {
                $ref: '#/components/schemas/Task'
              }
            }
          }
        }
      }
      #swagger.responses[400] = {
        content: {
          'application/json': {
            schema:{
              type: 'array',
              items: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
      #swagger.responses[401] = {}
      #swagger.responses[403] = {}
      #swagger.responses[500] = {}
    */
    try {
      const pager: Pager = RequestHelper.pager(req)
      const params: GetTasks = {
        free_text: RequestHelper.queryParamString(req, 'free_text'),
        important: RequestHelper.queryParamBoolean(req, 'important')
      }
      const taskPaging: Paging<Task> = await TaskService.findAll(pager, params)
      res.status(ResponseStatus.SUCCESS).json(taskPaging)
    } catch (error) {
      next(error)
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    /*
      #swagger.tags = ['Task']
      #swagger.security = [{
        'bearerAuth': []
      }]
      #swagger.parameters['id'] = {
        in: 'path',
        type: 'string'
      }
      #swagger.responses[200] = {
        content: {
          'application/json': {
            schema:{
              $ref: '#/components/schemas/Task'
            }
          }
        }
      }
      #swagger.responses[400] = {
        content: {
          'application/json': {
            schema:{
              type: 'array',
              items: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
      #swagger.responses[401] = {}
      #swagger.responses[403] = {}
      #swagger.responses[404] = {}
      #swagger.responses[500] = {}
    */
    try {
      const id: string = req.params.id
      const task = await TaskService.findById(id)

      if (!task) {
        throw new NotFoundError()
      }

      res.status(ResponseStatus.SUCCESS).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    /*
      #swagger.tags = ['Task']
      #swagger.security = [{
        'bearerAuth': []
      }]
      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SaveTask'
            }
          }
        }
      }
      #swagger.responses[201] = {
        content: {
          'application/json': {
            schema:{
              $ref: '#/components/schemas/Task'
            }
          }
        }
      }
      #swagger.responses[400] = {
        content: {
          'application/json': {
            schema:{
              type: 'array',
              items: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
      #swagger.responses[401] = {}
      #swagger.responses[403] = {}
      #swagger.responses[500] = {}
    */
    try {
      const data: CreateTask = {
        title: req.body.title,
        description: req.body.description,
        important: req.body.important,
        user_id: req.user?.id?.toString() || ''
      }
      const task: Task | null = await TaskService.create(data)
      res.status(ResponseStatus.CREATED).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    /*
      #swagger.tags = ['Task']
      #swagger.security = [{
        'bearerAuth': []
      }]
      #swagger.parameters['id'] = {
        in: 'path',
        type: 'string'
      }
      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SaveTask'
            }
          }
        }
      }
      #swagger.responses[200] = {
        content: {
          'application/json': {
            schema:{
              $ref: '#/components/schemas/Task'
            }
          }
        }
      }
      #swagger.responses[400] = {
        content: {
          'application/json': {
            schema:{
              type: 'array',
              items: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
      #swagger.responses[401] = {}
      #swagger.responses[403] = {}
      #swagger.responses[404] = {}
      #swagger.responses[500] = {}
    */
    try {
      const id: string = req.params.id
      const data: UpdateTask = {
        title: req.body.title,
        description: req.body.description,
        important: req.body.important
      }
      const task: Task | null = await TaskService.update(id, data)

      if (!task) {
        throw new NotFoundError()
      }

      res.status(ResponseStatus.SUCCESS).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    /*
      #swagger.tags = ['Task']
      #swagger.security = [{
        'bearerAuth': []
      }]
      #swagger.parameters['id'] = {
        in: 'path',
        type: 'string'
      }
      #swagger.responses[204] = {}
      #swagger.responses[400] = {
        content: {
          'application/json': {
            schema:{
              type: 'array',
              items: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
      #swagger.responses[401] = {}
      #swagger.responses[403] = {}
      #swagger.responses[404] = {}
      #swagger.responses[500] = {}
    */
    try {
      const id: string = req.params.id
      const success: boolean = await TaskService.delete(id)

      if (!success) {
        throw new NotFoundError()
      }

      res.status(ResponseStatus.NO_CONTENT).json()
    } catch (error) {
      next(error)
    }
  }
}
