import { Label } from '../services/github';

export default class LabelModel {
  private constructor(
    public id: number,
    public name: string,
    public color: string
  ) {}

  static from(raw: Label): LabelModel {
    return new LabelModel(raw.id, raw.name, `#${raw.color}`);
  }
}
