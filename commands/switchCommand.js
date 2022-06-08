import * as commands from './commands.js';

const switchCommand = async (dirname, command) => { 
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
      case 'cat':
          commands.catFunc();                                 
          break; 
      case 'add':
          commands.addFunc();                               
          break;
      case 'rn':
          commands.rnFunc();                                 
          break;     
      case 'cp':
          commands.cpFunc();                                 
          break;
      case 'mv':
          commands.mvFunc();                             
          break;
      case 'rm':
          commands.rmFunc();                                 
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
      default:
          output.write('Invalid input\n');                
          break;
  }   
  return newDirname
}

export { switchCommand }