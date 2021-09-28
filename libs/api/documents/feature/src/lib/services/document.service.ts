import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly repository: Repository<Document>
  ) {}

  async create(document: Document): Promise<Document> {
    // Create new user record
    return await this.repository.save(document);
  }

  async getById(id: string): Promise<Document | undefined> {
    const document = await this.repository.findOne(id);

    if (!document) {
      throw new NotFoundException(`No document with id ${id}`);
    }

    return document;
  }

  async update(id: string, document: Document): Promise<Document> {
    // TODO: Consider user repository update() method

    let dbDocument = await this.repository.findOne(id);

    if (dbDocument) {
      const doc = { ...dbDocument, ...document };

      dbDocument = await this.repository.save(doc);

      return dbDocument;
    }
  }
}
