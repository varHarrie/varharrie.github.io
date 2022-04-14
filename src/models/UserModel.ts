import { User } from '../services/github';

export default class UserModel {
  private constructor(
    public id: number,
    public login: string,
    public avatarUrl: string,
    public htmlUrl: string
  ) {}

  static from(raw: User): UserModel {
    return new UserModel(raw.id, raw.login, raw.avatar_url, raw.html_url);
  }
}
