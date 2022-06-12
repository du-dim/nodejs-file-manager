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
        return await commands.rnFunc(dirname, command.slice(1).join(' '));  
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
          break          
    case 'n':             
      break          
    case 'link':
        await pathToFileDir(dirname, command.slice(1).join(' '));                                 
        break;
    default:
        process.stdout.write('\x1b[35mInvalid input\n\x1b[0m');                
        break;
  }   
  return newDirname
}


/*
export const switchCommand = async (dirname, command) => { 
    const objSwitch = {
        help: commands.helpFunc(),
        up: await commands.cdFunc(dirname, '..'),
        cd: await commands.cdFunc(dirname, command.slice(1).join(' ')),
        ls: await commands.lsFunc(dirname),
        cat: await commands.catFunc(dirname, command.slice(1).join(' ')),
        add: await commands.addFunc(dirname, command.slice(1).join(' ')),
        rn: await commands.rnFunc(dirname, command.slice(1).join(' ')),
        cp: await commands.cpFunc(dirname, command.slice(1).join(' ')),
        mv: await commands.cpFunc(dirname, command.slice(1).join(' ')),
        rm: await commands.rmFunc(dirname, command.slice(1).join(' ')),
        os: await commands.osFunc(),
        hash: await commands.hashFunc(),
        compres: await commands.compressFunc(),
        decomress: await commands.decompressFunc(), 
    }
    const choese = objSwitch[command[0]];
    console.log(choese);
    return choese;
}
*/