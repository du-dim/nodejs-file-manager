import readline from 'readline';
import path from 'path';

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
        switch (input) {
            case '.exit':
                output.write(`Thank you for using File Manager, ${username}!`); 
                rl.close();
                break;                      
            default:
                output.write('Invalid input\n');
                break;
        }
    }); 
};

entrance();