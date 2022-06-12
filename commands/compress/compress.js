import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pathToFileDir } from '../pathToFileDir.js';
import { absolutePath } from '../absolutePath.js';

export const compressFunc = async (dirname, addition) => {
  try {
    const gzip = zlib.createGzip();
    const linkCommand = await pathToFileDir(dirname, addition);    
    if (linkCommand.firstDir) throw Error(`\x1b[33m${linkCommand.firstDir}\x1b[35m is a directory. \nThe path should only be to the file path_to_file.`);     
    if (!linkCommand.firstFile) throw Error('The command must be followed by a path_to_file and path_to_new_directory.');
    if (!linkCommand.tail) throw Error('path_to_file is followed by path_to_new_directory');
    if (linkCommand.secondFile) throw Error('path_to_file is followed by path_to_new_directory');
    if (linkCommand.tail.search(/[\:\*\?\"\<\>\|]/) !== -1) {
      const textErr1 = 'path_to_new_directory entered incorrectly.\n';
      const textErr2 = '\x1b[35mCharacters «\x1b[36m:\x1b[35m», «\x1b[36m*\x1b[35m», «\x1b[36m?\x1b[35m», «\x1b[36m"\x1b[35m», «\x1b[36m<\x1b[35m», «\x1b[36m>\x1b[35m», «\x1b[36m|\x1b[35m» cannot be used.\x1b[0m'
      throw Error(textErr1 + textErr2);
    }
    if (linkCommand.firstFile === linkCommand.secondFile) throw Error(`${path.parse(linkCommand.firstFile).base} with the same name already exists in ${path.dirname(linkCommand.firstFile)}`);
    if (!linkCommand.secondDir) {
      const newDir = absolutePath(dirname, linkCommand.tail);
      await fsp.mkdir(newDir, { recursive: true }, async (err) => {
        if(err) throw Error('Failed to create folder(s)'); // не удалось создать папки                                                              
      });             
      const myReadStream = fs.createReadStream(linkCommand.firstFile); 
      const myWriteStream = fs.createWriteStream(path.join(newDir, path.parse(linkCommand.firstFile).name + '.gz'));
      myReadStream.pipe(gzip).pipe(myWriteStream); 
      myReadStream.on('close', async () => await fs.promises.rm(linkCommand.firstFile, { recursive: true }));
    };    
    const myReadStream = fs.createReadStream(linkCommand.firstFile, 'utf8'); 
    const myWriteStream = fs.createWriteStream(path.join(linkCommand.secondDir, path.parse(linkCommand.firstFile).name + '.gz'));
    myReadStream.pipe(gzip).pipe(myWriteStream); 
    myReadStream.on('close', async () => await fs.promises.rm(linkCommand.firstFile, { recursive: true }));
  } catch (error) {
    process.stdout.write('\x1b[35mOperation failed.\n' + error.message + '\n\x1b[0m');
  }
};