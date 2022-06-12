import { accessPath } from './accessPath.js';
import { absolutePath } from './absolutePath.js';

export const pathToFileDir = async (dirname, addition) => {
  try { 
    const linkCommand = {
      firstDir: undefined,
      firstFile: undefined,
      tail: undefined,
      secondDir: undefined,
      secondFile: undefined,      
    }
    const parts = addition.split(' '); 
    const partSecond = parts;
    const partsLink = parts.map((_, i, arr) => Array(i + 1).fill().map((_, j) => arr[j]).join(' '));
    const absoluteLink = partsLink.map(e => absolutePath(dirname, e));    
    console.log(absoluteLink);
    // Поллучаем первый путь из команды     
    const promisesFirst = await absoluteLink.map(async (e) => await accessPath(e));         
    (await Promise.allSettled(promisesFirst)).forEach((res, i) => {      
      if (res.value !== undefined) {
        if (res.value.isDirectory()) {          
          linkCommand.firstDir = absoluteLink[i];     
          console.log('dir');    
        };
        if (res.value.isFile()) {          
          linkCommand.firstFile = absoluteLink[i];
          console.log('file'); 
        };  
        partSecond.splice(0, i + 1);             
      }
    });

    // если ошибка с регистром
    if (linkCommand.firstDir && linkCommand.firstFile) {      
      linkCommand.firstDir = undefined;
      linkCommand.tail = absoluteLink[absoluteLink.length - 1].replace(linkCommand.firstFile, '').trim();
    }

    // Поллучаем второй путь из команды
    if ((partSecond.length || linkCommand.tail !== undefined) && (linkCommand.firstFile || linkCommand.firstDir)) {      
      if (linkCommand.tail === undefined) linkCommand.tail =  partSecond.join(' ');
      const absoluteSecond = absolutePath(dirname, linkCommand.tail);
      const result = await accessPath(absoluteSecond);      
      if (result !== undefined) {
        if (result.isDirectory()) {          
          linkCommand.secondDir = absoluteSecond; 
          console.log('dir');        
        };
        if (result.isFile()) {          
          linkCommand.secondFile = absoluteSecond;
          console.log('file');          
        };             
      }      
    }
    return linkCommand;    
  } catch {
    console.error('File does not exists');
  }
}