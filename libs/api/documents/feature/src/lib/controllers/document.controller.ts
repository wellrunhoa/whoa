import { Controller, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile, ApiFiles, ParseFile } from '@whoa/api/core/feature';
//import { Document } from '../entities/document.entity';
import { DocumentService } from '../services/document.service';
import { Document } from '@prisma/client';

@Controller('documents')
@ApiTags('documents')
export class DocumentController {
  constructor(private service: DocumentService) {}

  @ApiFile('upload', 'file', true)
  uploadFile(@UploadedFile(ParseFile) file: Express.Multer.File): Promise<Document> {
    console.log(file);
    const document = {
      documentTitle: file.originalname,
      documentPath: file.path,
      documentType: 'DR Request'
    } as Document;
    return this.service.create(document);
  }

  @ApiFiles('uploads', 'files', true)
  uploadFiles(@UploadedFiles(ParseFile) files: Array<Express.Multer.File>): Promise<Document[]> {
    console.log(files);
    return null;
  }
}
