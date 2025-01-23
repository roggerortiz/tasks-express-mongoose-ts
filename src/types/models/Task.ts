export type Task = {
  id: string
  title: string
  slug: string
  description: string
  important: boolean
  user_id: string
}

export type CreateTask = Omit<Task, 'id'>

export type UpdateTask = Partial<Omit<CreateTask, 'user_id'>>
