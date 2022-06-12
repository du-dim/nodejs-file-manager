import * as commands from './commands.js';
import { pathToFileDir } from './pathToFileDir.js';

export const switchCommand = async (dirname, command) => { 
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
    case 'cp':
          await commands.cpFunc(dirname, command.slice(1).join(' '));                                 
        break;
    case 'mv':
      await commands.mvFunc(dirname, command.slice(1).join(' '));                                                 
        break;
    case 'rm':
        await commands.rmFunc(dirname, command.slice(1).join(' '));                                 
        break;
    case 'os':
        await commands.osFunc(command.slice(1).join(' ')); 
        dirname;                                 
        break;
    case 'hash':
        await commands.hashFunc(dirname, command.slice(1).join(' '));                                 
        break;
    case 'compress':
        await commands.compressFunc(dirname, command.slice(1).join(' '));                                 
        break;
    case 'decompress':
        await commands.decompressFunc(dirname, command.slice(1).join(' '));                                 
        break;
    case 'y':                 
          break          
    case 'n':             
      break;   
    default:
        process.stdout.write('\x1b[35mInvalid input\n\x1b[0m');                
        break;
  }   
  return newDirname
}
