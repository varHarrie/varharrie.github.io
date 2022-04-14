import { Comment } from '../services/github';
import UserModel from './UserModel';

export default class CommentModel {
  private constructor(
    public id: number,
    public body: string,
    public htmlUrl: string,
    public authorAssociation: string,
    public createdAt: string,
    public updatedAt: string,
    public user: UserModel
  ) {}

  static from(raw: Comment): CommentModel {
    return new CommentModel(
      raw.id,
      raw.body,
      raw.html_url,
      raw.author_association,
      raw.created_at,
      raw.updated_at,
      UserModel.from(raw.user)
    );
  }
}
