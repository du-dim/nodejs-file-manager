import readline from 'readline';
import path from 'path';
import * as commands from './commands/commands.js';

const __dirname = path.resolve();
const args = process.argv.slice(2);
const input = process.stdin;
const output = process.stdout;
const rl = readline.createInterface({ input, output });

const entrance = async () => {
    const username = args.find((e) => e.includes('--username=')).replace('--username=', '');
    const welcome = `Welcome to the File Manager, ${username}!\n`;
    output.write(welcome);   
    output.write(`You are currently in ${__dirname}\n`);
    
    rl.on('line', (input) => {   
        const command = input.trim().split(' ');        
        switch (command[0]) {
            case 'help':
                commands.helpFunc(); 
                break;               
            case 'exit':
                output.write(`Thank you for using File Manager, ${username}!`); 
                rl.close();
                break;     
            case 'up':
                commands.upFunc();                 
                break;   
            case 'cd':
                commands.cdFunc();                 
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
        
    }); 
    
};

entrance();