import { Injectable } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class ModelConverter<D, M> {
  constructor(private dtoType: new () => D, private modelType: new () => M) {}

  toModel(dto: D): M {
    const data = classToPlain(dto);
    return plainToClass(this.modelType, data);
  }

  toDTO(model: M): D {
    const data = classToPlain(model);
    return plainToClass(this.dtoType, data);
  }
}
