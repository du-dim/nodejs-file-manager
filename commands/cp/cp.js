import fs from "fs";
import path from "path";
import readline from 'readline';
import { absolutePath } from "../cd/cd.js";

const fsp = fs.promises;

export const cpFunc = async (dirname, addition) => {   
  try {
    const parts = addition.split(' '); 
    const partsLink = parts.map((a, i, arr) => Array(i + 1).fill().map((_, j) => arr[j]).join(' '));
    const checkLink = partsLink.map(link => fs.existsSync(absolutePath(dirname, link)));        
    if ( checkLink.length === 1 && checkLink[0]) throw Error(`Enter the path where to copy the file x1b[33m${partsLink[0]}x1b[0m`);
    if ( checkLink.length === 1 && !checkLink[0]) throw Error(`${partsLink[0]} not found. Enter the correct paths. \n\x1b[35mCharacters «\x1b[36m\\\x1b[35m», «\x1b[36m/\x1b[35m», «\x1b[36m:\x1b[35m», «\x1b[36m*\x1b[35m», «\x1b[36m?\x1b[35m», «\x1b[36m"\x1b[35m», «\x1b[36m<\x1b[35m», «\x1b[36m>\x1b[35m», «\x1b[36m|\x1b[35m» cannot be used.\x1b[0m`);
    if ( partsLink.every(el => el.search(/[\:\*\?\"\<\>\|]/) !== -1)) throw Error('Enter the correct paths. Characters «\x1b[36m\\\x1b[35m», «\x1b[36m/\x1b[35m», «\x1b[36m:\x1b[35m», «\x1b[36m*\x1b[35m», «\x1b[36m?\x1b[35m», «\x1b[36m"\x1b[35m», «\x1b[36m<\x1b[35m», «\x1b[36m>\x1b[35m», «\x1b[36m|\x1b[35m» cannot be used.\x1b[0m');
    if ( checkLink.every(el => !el)) throw Error('Enter the correct paths. Characters «\x1b[36m\\\x1b[35m», «\x1b[36m/\x1b[35m», «\x1b[36m:\x1b[35m», «\x1b[36m*\x1b[35m», «\x1b[36m?\x1b[35m», «\x1b[36m"\x1b[35m», «\x1b[36m<\x1b[35m», «\x1b[36m>\x1b[35m», «\x1b[36m|\x1b[35m» cannot be used.\x1b[0m');            
    
    let pathDir = [];    
    for await(let chunk of parts) {                 
      pathDir.push(chunk);        
      const currentPath = absolutePath(dirname, path.join(pathDir.join(' ')));                  
      if (fs.existsSync(currentPath)) {        
        fs.stat(currentPath, (err, stats) => {          
          if (stats.isFile()) {                                  
            const fullDir = absolutePath(dirname, addition);            
            const secondPart = fullDir.replace(currentPath, '').trim();
            const newDir = absolutePath(dirname, secondPart);
            const file = path.win32.basename(currentPath);                        
            if (fs.existsSync(newDir)) {              
              fs.stat(newDir, (err, stats) => {
                if (stats.isFile()) throw Error(`${newDir} is a file, not a directory`);                
                if (fs.existsSync(path.join(newDir, file))) {
                  process.stdout.write(`\x1b[32m${path.join(newDir, file)}\x1b[36m already exists.\n\x1b[35mDo you want to replace it? Yes - «\x1b[36my\x1b[35m»; No - «\x1b[36mn\x1b[35m»\n\x1b[0m`);
                  const rYN = readline.createInterface({ input : process.stdin });
                  rYN.on('line', (input) => {
                    if (input.trim() === 'y')  {
                      const myReadStream = fs.createReadStream(currentPath, 'utf8'); 
                      const myWriteStream = fs.createWriteStream(path.join(newDir, file), 'utf8');
                      myReadStream.pipe(myWriteStream);                                                                
                    };                                       
                  });                                    
                } else {
                  const myReadStream = fs.createReadStream(currentPath, 'utf8'); 
                  const myWriteStream = fs.createWriteStream(path.join(newDir, file), 'utf8');
                  myReadStream.pipe(myWriteStream);                                                     
                }                
              });
            } else {
              // создать папку newDir              
              fsp.mkdir(newDir, { recursive: true }, err => {
                if(err) throw Error('Failed to create folder(s)'); // не удалось создать папки                                                              
              });    
              const myReadStream = fs.createReadStream(currentPath, 'utf8'); 
              const myWriteStream = fs.createWriteStream(path.join(newDir, file), 'utf8');
              myReadStream.pipe(myWriteStream);                                             
            };                                   
          } 
        });                       
      }                   
    }
  } catch (error) {
    process.stdout.write('\x1b[35mOperation failed\n' + error.message + '\n\x1b[0m');
  }
};
