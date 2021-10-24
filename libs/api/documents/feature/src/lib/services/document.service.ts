import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@whoa/api/core/feature';
import { Document } from '@prisma/client';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(document: Document): Promise<Document> {
    return this.prisma.document.create({
      data: document
    });
  }

  async getById(id: string): Promise<Document | undefined> {
    const document = await this.prisma.document.findUnique({
      where: { id }
    });

    if (!document) {
      throw new NotFoundException(`No document with id ${id}`);
    }

    return document;
  }

  async update(id: string, document: Document): Promise<Document> {
    let dbDocument = await this.getById(id);

    if (dbDocument) {
      const doc = { ...dbDocument, ...document };

      dbDocument = await this.prisma.document.update({
        data: doc,
        where: { id }
      });

      return dbDocument;
    }
  }
}
