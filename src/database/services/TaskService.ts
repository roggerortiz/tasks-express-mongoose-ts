import UtilsHelper from '@/helpers/UtilsHelper'
import { CreateTask, Task, UpdateTask } from '@/types/models/Task'
import Pager from '@/types/pagination/Pager'
import Paging from '@/types/pagination/Paging'
import { GetTasks } from '@/types/requests/GetTasks'
import { HydratedDocument } from 'mongoose'
import BaseModel from '../models/BaseModel'
import TaskModel, { ITask } from '../models/TaskModel'

export default class TaskService {
  static async findAll(pager: Pager, params: GetTasks): Promise<Paging<Task>> {
    return BaseModel.aggregate<ITask, Task>(TaskModel, pager, params)
  }

  static async findById(id: string): Promise<Task | null> {
    const document: HydratedDocument<ITask> | null = await TaskModel.findById(id)
    return BaseModel.toJSON<ITask, Task>(document)
  }

  static async create(data: CreateTask): Promise<Task | null> {
    const slug: string = UtilsHelper.slugify(data.title) ?? ''
    const document: HydratedDocument<ITask> | null = await TaskModel.create({ ...data, slug })
    return BaseModel.toJSON<ITask, Task>(document)
  }

  static async update(id: string, data: UpdateTask): Promise<Task | null> {
    const slug: string = UtilsHelper.slugify(data.title) ?? ''
    const document: HydratedDocument<ITask> | null = await TaskModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...data, slug } },
      { new: true }
    )
    return BaseModel.toJSON<ITask, Task>(document)
  }

  static async delete(id: string): Promise<Task | null> {
    const document: HydratedDocument<ITask> | null = await TaskModel.findOneAndDelete({ _id: id })
    return BaseModel.toJSON<ITask, Task>(document)
  }
}
