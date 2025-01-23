import TaskService from '@/database/services/TaskService'
import RequestHelper from '@/helpers/RequestHelper'
import UtilsHelper from '@/helpers/UtilsHelper'
import Paging from '@/types/core/Paging'
import ResponseStatus from '@/types/enums/ResponseStatus'
import NotFoundError from '@/types/errors/NotFoundError'
import { CreateTask, Task, UpdateTask } from '@/types/models/Task'
import { GetTasks } from '@/types/requests/GetTasks'
import { Request } from '@/types/requests/Request'
import { NextFunction, Response } from 'express'

export default class TaskController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const params: GetTasks = {
        pageSize: RequestHelper.queryParamNumber(req, 'pageSize'),
        pageIndex: RequestHelper.queryParamNumber(req, 'pageIndex'),
        sortField: RequestHelper.queryParamString(req, 'sortField'),
        sortDirection: RequestHelper.queryParamString(req, 'sortDirection'),
        freeText: RequestHelper.queryParamString(req, 'freeText')
      }
      const taskPaging: Paging<Task> = await TaskService.findAll(params)
      res.status(ResponseStatus.SUCCESS).json(taskPaging)
    } catch (error) {
      next(error)
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
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
    try {
      const data: CreateTask = {
        title: req.body.title,
        slug: UtilsHelper.slugify(req.body.title) ?? '',
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
    try {
      const id: string = req.params.id
      const data: UpdateTask = {
        title: req.body.title,
        slug: UtilsHelper.slugify(req.body.title),
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
    try {
      const id: string = req.params.id
      const task = await TaskService.delete(id)

      if (!task) {
        throw new NotFoundError()
      }

      res.status(ResponseStatus.SUCCESS).json(task)
    } catch (error) {
      next(error)
    }
  }
}
