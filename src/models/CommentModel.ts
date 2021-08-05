import { Comment } from '~/services/github';

export default class CommentModel {
  private constructor(
    public id: number,
    public bodyHtml: string,
    public htmlUrl: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static from(raw: Comment): CommentModel {
    return new CommentModel(raw.id, raw.body_html, raw.html_url, raw.created_at, raw.updated_at);
  }
}
