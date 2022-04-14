import { Milestone } from '../services/github';

export default class CategoryModel {
  private constructor(
    public id: number,
    public number: number,
    public title: string,
    public description: string,
    public articles: number
  ) {}

  static from(raw: Milestone): CategoryModel {
    return new CategoryModel(
      raw.id,
      raw.number,
      raw.title,
      raw.description,
      raw.open_issues
    );
  }
}
