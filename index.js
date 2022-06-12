import os from 'os';
import readline from 'readline';
import { switchCommand } from './commands/switchCommand.js';

const entrance = async () => {
    const input = process.stdin;
    const output = process.stdout;
    const rl = readline.createInterface({ input, output });
    const args = process.argv.slice(2);
    let dirname = os.homedir();
    const username = args.find((e) => e.includes('--username=')).replace('--username=', '');    
    process.stdout.write(`\x1b[3m\x1b[32mWelcome to the File Manager, ${username}!\n\x1b[0m`);
    process.stdout.write(`\x1b[34mYou are currently in \x1b[4m\x1b[33m${dirname}\n\x1b[0m`);
        
    rl.on('line', async (input) => {        
        if (input === '.exit') {
            process.stdout.write(`\x1b[32mThank you for using File Manager, ${username}!\x1b[0m`);  
            rl.close();          
        } else {            
            const command = input.split(' ');            
            dirname = await switchCommand(dirname, command);             
            process.stdout.write(`\n\x1b[36mYou are currently in \x1b[4m\x1b[33m${dirname}\n\x1b[0m`);          
        }
    })                    
};

entrance();