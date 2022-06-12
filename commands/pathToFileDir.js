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

    // Поллучаем первый путь из команды     
    const promisesFirst = await absoluteLink.map(async (e) => await accessPath(e));         
    (await Promise.allSettled(promisesFirst)).forEach((res, i) => {
      if (res.value !== undefined) {
        if (res.value.isDirectory()) {          
          linkCommand.firstDir = absoluteLink[i];         
        };
        if (res.value.isFile()) {          
          linkCommand.firstFile = absoluteLink[i];          
        };  
        partSecond.splice(0, i + 1);             
      }
    });

    // Поллучаем второй путь из команды
    if (partSecond.length && (linkCommand.firstFile || linkCommand.firstDir)) {
      linkCommand.tail = partSecond.join(' ');
      const absoluteSecond = absolutePath(dirname, linkCommand.tail);
      const result = await accessPath(absoluteSecond);      
      if (result !== undefined) {
        if (result.isDirectory()) {          
          linkCommand.secondDir = absoluteSecond;         
        };
        if (result.isFile()) {          
          linkCommand.secondFile = absoluteSecond;          
        };             
      }      
    }
    return linkCommand;    
  } catch {
    console.error('File does not exists');
  }
}