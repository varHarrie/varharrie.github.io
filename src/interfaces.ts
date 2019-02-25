export interface ILabel {
  id: number
  name: string
  color: string
}

export interface IUser {
  id: number
  login: string
  avatar_url: string
  url: string
  html_url: string
}

export interface IArticle {
  id: number
  number: number
  title: string
  user: IUser
  labels: ILabel[]
  comments: number
  created_at: string
  updated_at: string
  author_association: string
  body_html: string
  html_url: string
}

export interface IComment {
  id: number
  created_at: string
  updated_at: string
  author_association: string
  body_html: string
  user: IUser
}
