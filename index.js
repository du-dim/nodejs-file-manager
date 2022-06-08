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
    output.write(`Welcome to the File Manager, ${username}!\n`);
    output.write(`You are currently in ${dirname}\n`); 
    
    rl.on('line', async (input) => {                   
        if (input.trim() === '.exit') {
            output.write(`Thank you for using File Manager, ${username}!`);
            rl.close();
        } else {
            const command = input.trim().split(' ');            
            dirname = await switchCommand(dirname, command);  
            output.write(`You are currently in ${dirname}\n`);                   
        }                 
    });    
      
};

await entrance();