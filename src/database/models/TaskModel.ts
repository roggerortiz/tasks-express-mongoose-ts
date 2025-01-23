import { Model } from '@/types/mongoose/Model'
import { Schema, Types, model } from 'mongoose'

export interface ITask {
  title: string
  slug: string
  description?: string
  important: boolean
  user_id: Types.ObjectId
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    important: {
      type: Boolean,
      required: false,
      default: false
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  {
    versionKey: false
  }
)

const TaskModel = model<ITask, Model<ITask>>('tasks', taskSchema)

export default TaskModel
