export type Task = {
  id: string
  title: string
  slug: string
  description?: string
  important: boolean
  user_id: string
}

export type CreateTask = Omit<Task, 'id' | 'slug'>

export type UpdateTask = Omit<Task, 'id' | 'slug' | 'user_id'>
