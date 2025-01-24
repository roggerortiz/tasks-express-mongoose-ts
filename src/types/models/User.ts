export type User = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  username: string
  password: string
}

export type CreateUser = Omit<User, 'id'>

export type UpdateUser = Omit<User, 'id'>
