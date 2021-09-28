import { Logger } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

export class FileHelper {
  static customFileName(rootDir, req, file, cb) {
    //cb(null, `{${uuid()}$extname(file.originalname)}`);
    cb(null, file.originalname);
  }

  static destinationPath(rootDir, req, file, cb) {
    // initial upload path
    //let destination = path.join(__dirname, 'uploads');

    // if user logged in and You store user object in session
    // if (req.session && req.session.user && req.session.user.id) {
    //   destination = path.join(destination, 'users', req.session.user.id, uuid());
    // }
    // else {
    const destination = join(rootDir, 'files', uuid());
    //}
    if (!existsSync(destination)) {
       mkdirSync(destination, { recursive: true });
    }
    cb(null, destination);
  }
}
