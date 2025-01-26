import { CreateTask, Task, UpdateTask } from '@/types/models/Task'
import Pager from '@/types/pagination/Pager'
import Paging from '@/types/pagination/Paging'
import { GetTasks } from '@/types/request/GetTasks'
import { HydratedDocument } from 'mongoose'
import BaseModel from '../models/BaseModel'
import TaskModel, { ITask } from '../models/TaskModel'

export default class TaskService {
  static async findAll(pager: Pager, params: GetTasks): Promise<Paging<Task>> {
    const taskPaging: Paging<Task> = await BaseModel.paginate<ITask, Task>(TaskModel, pager, params)
    return taskPaging
  }

  static async findById(id: string): Promise<Task | null> {
    const document: HydratedDocument<ITask> | null = await TaskModel.findById(id)
    return BaseModel.toJSON<ITask, Task>(document)
  }

  static async create(data: CreateTask): Promise<Task | null> {
    const document: HydratedDocument<ITask> | null = await TaskModel.create({ ...data, slug: data.title })
    return BaseModel.toJSON<ITask, Task>(document)
  }

  static async update(id: string, data: UpdateTask): Promise<Task | null> {
    const document: HydratedDocument<ITask> | null = await TaskModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...data, slug: data.title } },
      { new: true, runValidators: true, _id: id }
    )
    return BaseModel.toJSON<ITask, Task>(document)
  }

  static async delete(id: string): Promise<boolean> {
    const document: HydratedDocument<ITask> | null = await TaskModel.findOneAndDelete({ _id: id })
    return document !== null
  }
}
