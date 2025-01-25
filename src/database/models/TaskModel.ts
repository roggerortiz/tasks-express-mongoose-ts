import MongooseHelper from '@/helpers/MongooseHelper'
import UtilsHelper from '@/helpers/UtilsHelper'
import DatabaseField from '@/types/enums/DatabaseField'
import { Model } from '@/types/mongoose/Model'
import { Schema, Types, model, models } from 'mongoose'

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
      unique: true,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      set: (value: string) => UtilsHelper.slugify(value)
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
    versionKey: false,
    timestamps: {
      createdAt: DatabaseField.CREATED_AT,
      updatedAt: DatabaseField.UPDATED_AT
    }
  }
)

const TaskModel = model<ITask, Model<ITask>>('Task', taskSchema, 'tasks')

taskSchema
  .path('title')
  .validate(MongooseHelper.uniqueValidatorFn<ITask>(models.Task, 'title'), "The 'Title' value already exists")

export default TaskModel
