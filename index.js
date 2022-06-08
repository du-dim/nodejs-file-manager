import os from 'os';
import readline from 'readline';
import { switchCommand } from './commands/switchCommand.js';

const args = process.argv.slice(2);
const input = process.stdin;
const output = process.stdout;
const rl = readline.createInterface({ input, output });

const entrance = async () => {
    let dirname = os.homedir();
    const username = args.find((e) => e.includes('--username=')).replace('--username=', '');    
    output.write(`\x1b[3m\x1b[32mWelcome to the File Manager, ${username}!\n\x1b[0m`);
    output.write(`\x1b[34mYou are currently in \x1b[4m\x1b[33m${dirname}\n\x1b[0m\x1b[37m`); 
    
    rl.on('line', async (input) => {                   
        if (input.trim() === '.exit') {
            output.write(`\x1b[32mThank you for using File Manager, ${username}!`);
            rl.close();
        } else {
            const command = input.trim().split(' ');            
            dirname = await switchCommand(dirname, command);  
            output.write(`\x1b[36mYou are currently in \x1b[4m\x1b[33m${dirname}\n\x1b[0m\x1b[37m`);                   
        }                 
    });    
      
};

await entrance();