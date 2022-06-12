import fs from 'fs';
import path from 'path';
import { pathToFileDir } from '../pathToFileDir.js';
import readline from 'readline';


const fsp = fs.promises;

export const rnFunc = async (dirname, addition) => {    
  try {
    const linkCommand = await pathToFileDir(dirname, addition);    
    if (linkCommand.firstDir) throw Error(`\x1b[33m${linkCommand.firstDir}\x1b[35m is a directory. \nThe path should only be to the file path_to_file.`);     
    if (!linkCommand.firstFile) throw Error('The command must be followed by a path_to_file and new_filename.');
    if (!linkCommand.tail) throw Error('path_to_file is followed by new_filename');
    if (linkCommand.tail.search(/[\\\/\:\*\?\"\<\>\|]/) !== -1) {
      const textErr1 = 'new_filename entered incorrectly.\n';
      const textErr2 = '\x1b[35mCharacters «\x1b[36m\\\x1b[35m», «\x1b[36m/\x1b[35m», «\x1b[36m:\x1b[35m», «\x1b[36m*\x1b[35m», «\x1b[36m?\x1b[35m», «\x1b[36m"\x1b[35m», «\x1b[36m<\x1b[35m», «\x1b[36m>\x1b[35m», «\x1b[36m|\x1b[35m» cannot be used.\x1b[0m'
      throw Error(textErr1 + textErr2);
    }
    const firstDir = path.dirname(linkCommand.firstFile);
    const secondFile = path.join(firstDir, linkCommand.tail);
    const linkCommand2 = await pathToFileDir(dirname, secondFile);            
    if (linkCommand2.firstFile) {
      let count = 0;
      const fileName = path.parse(linkCommand2.firstFile).name;
      const extName = path.parse(linkCommand2.firstFile).ext;      
      const recurse = async () => {
        count++;
        const linkCommandNext = await pathToFileDir(dirname, path.join(firstDir, `${fileName} (${count})${extName}`));
        if (linkCommandNext.firstFile) return await recurse();                
      } 
      await recurse();
            
      const textErr1 = `\x1b[32m${fileName + extName}\x1b[35m with the same name already exists in this location.\x1b[0m\n`;
      const textQuestion = `\x1b[35mDo you want to rename "\x1b[36m${fileName + extName}\x1b[35m" to "\x1b[36m${fileName} (${count})${extName}\x1b[35m"? Yes - «\x1b[36my\x1b[35m»; No - «\x1b[36mn\x1b[35m»\x1b[0m\n`; 
      process.stdout.write(textErr1 + textQuestion); 

      const promise = new Promise((resolve, rejects) => {
        const input = process.stdin;  
        const rYN = readline.createInterface({ input });
        rYN.on('line', async (input) => {                   
          if (input.trim() === 'y') resolve (true);
          if (input.trim() === 'n') resolve (false)           
        });         
      })   
      await promise.then(res => {
        if (res) {
            fsp.rename(linkCommand.firstFile, path.join(firstDir, `${fileName} (${count})${extName}`), (err) => {
            process.stdout.write(`\x1b[32m${fileName + extName}\x1b[36m was successfully renamed to \x1b[32m${fileName} (${count})${extName}\n\x1b[0m`);             
          }); 
        }
      })          
    } else {
      await fsp.rename(linkCommand.firstFile, secondFile, async (err) => {
        process.stdout.write(`\x1b[32m${path.parse(linkCommand.firstFile).base}\x1b[36m was successfully renamed to \x1b[32m${linkCommand.tail}\n\x1b[0m`);        
      });        
    } 
        
  } catch (error) {
    process.stdout.write('\x1b[35mOperation failed.\n' + error.message + '\n\x1b[0m');   
  }  
  
}
