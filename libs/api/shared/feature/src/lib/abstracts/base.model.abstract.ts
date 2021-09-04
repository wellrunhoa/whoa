import { classToPlain, Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class BaseModel {

  createdDate?: Date; // provided by timestamps
  @Expose()

  updatedDate?: Date; // provided by timestamps

  // @Expose({ name: 'id' })
  // @Transform(({ value }) => value && value.toString())
  // tslint:disable-next-line: variable-name
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id?: any;

  id?: string; // is actually model._id getter

  // tslint:disable-next-line: variable-name
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _v?: any;

  // add more to a base model if you want.

  toJSON() {
    return classToPlain(this);
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

  static get modelName(): string {
    return this.name;
  }
}