export abstract class BaseDTO {
  id: string;
  active: boolean;
  archived: boolean;
  createDateTime: Date;
  createdBy: string;
  lastChangedDateTime: Date;
  lastChangedBy: string;
}
