import * as commands from './commands.js';
import { disagree } from './disagree.js';
import { agree } from './agree.js';
import { pathToFile } from './pathToFileDir.js';

export const switchCommand = async (dirname, command, lastСommand) => { 
  let newDirname  = dirname; 
  switch (command[0]) {
      case 'help':
          commands.helpFunc();                 
          break;   
      case 'up':
        newDirname = await commands.cdFunc(dirname, '..');                                 
          break;   
      case 'cd':          
        newDirname = await commands.cdFunc(dirname, command.slice(1).join(' '));                                                                         
          break;
      case 'ls':          
          await commands.lsFunc(dirname);                                                                         
          break;    
      case 'cat':
          await commands.catFunc(dirname, command.slice(1).join(' '));                                 
          break; 
      case 'add':
          await commands.addFunc(dirname, command.slice(1).join(' '));                               
          break;
      case 'rn':
          await commands.rnFunc(dirname, command.slice(1).join(' '));                                 
          break;     
      case 'cp':
            await commands.cpFunc(dirname, command.slice(1).join(' '));                                 
          break;
      case 'mv':
            const cp = await commands.cpFunc(dirname, command.slice(1).join(' '));
            const rm = await commands.rmFunc(dirname, command.slice(1).join(' ')); 
            for (const iterator of [cp, rm]) {
                iterator;                
            }                                      
          break;
      case 'rm':
          await commands.rmFunc(dirname, command.slice(1).join(' '));                                 
          break;
      case 'os':
          commands.osFunc();                                 
          break;
      case 'hash':
          commands.hashFunc();                                 
          break;
      case 'compress':
          commands.compressFunc();                                 
          break;
      case 'decompress':
          commands.decompressFunc();                                 
          break;
      case 'y':
          await agree(lastСommand);                                          
          break;
      case 'n':    
          await disagree(lastСommand);                                       
          break;
      case 'link':
          await pathToFileDir(dirname, command.slice(1).join(' '));                                 
          break;
      default:
          process.stdout.write('\x1b[35mInvalid input\n\x1b[0m');                
          break;
  }   
  return newDirname
}
