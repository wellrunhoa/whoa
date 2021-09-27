import { Controller, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile, ApiFiles, ParseFile } from '@whoa/api/core/feature';
import { Document } from '../entities/document.entity';
import { DocumentService } from '../services/document.service';

@Controller('documents')
@ApiTags('documents')
export class DocumentController {
  constructor(private service: DocumentService){}

  @ApiFile('upload', 'file', true)
  uploadFile(@UploadedFile(ParseFile) file: Express.Multer.File): Promise<Document> {
    console.log(file);
    const document = new Document();
    document.title = file.originalname;
    document.documentPath = file.path;
    document.documentType = "DR Request";
    return this.service.create(document);
  }

  @ApiFiles('uploads', 'files', true)
  uploadFiles(@UploadedFiles(ParseFile) files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
