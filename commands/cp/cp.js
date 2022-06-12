import fs from 'fs';
import path from 'path';
import { pathToFileDir } from '../pathToFileDir.js';
import { absolutePath } from '../absolutePath.js';


const fsp = fs.promises;

export const cpFunc = async (dirname, addition) => {   
  try {
    const linkCommand = await pathToFileDir(dirname, `${addition}`);     
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
      const myReadStream = fs.createReadStream(linkCommand.firstFile, 'utf8'); 
      const myWriteStream = fs.createWriteStream(path.join(newDir, path.parse(linkCommand.firstFile).base), 'utf8');
      myReadStream.pipe(myWriteStream); 
    };    
    const myReadStream = fs.createReadStream(linkCommand.firstFile, 'utf8'); 
    const myWriteStream = fs.createWriteStream(path.join(linkCommand.secondDir, path.parse(linkCommand.firstFile).base), 'utf8');
    myReadStream.pipe(myWriteStream);
  } catch (error) {
    process.stdout.write('\x1b[35mOperation failed.\n' + error.message + '\n\x1b[0m');
  }
};

/*
process.stdout.write(`\x1b[32m${path.join(newDir, file)}\x1b[36m already exists.\n\x1b[35mDo you want to replace it? Yes - «\x1b[36my\x1b[35m»; No - «\x1b[36mn\x1b[35m»\n\x1b[0m`);
const rYN = readline.createInterface({ input : process.stdin });
rYN.on('line', (input) => {
  if (input.trim() === 'y')  {
  const myReadStream = fs.createReadStream(currentPath, 'utf8'); 
  const myWriteStream = fs.createWriteStream(path.join(newDir, file), 'utf8');
  myReadStream.pipe(myWriteStream);                                                                
  };                                       
});                                  
*/
