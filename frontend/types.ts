export interface IPost {
  id: string
  attributes: {
    title: string
    content: string
    publishedAt: string
    slug: string
  }
}
