import readline from 'readline';
import path from 'path';
import { link } from 'fs';

const __dirname = path.resolve();
const args = process.argv.slice(2);
const input = process.stdin;
const output = process.stdout;
const rl = readline.createInterface({ input, output });

const  operationList = ['help', '.exit', 'up', 'cd', 'cat', 'add', 'rn', 'cp', 'mv', 'rm', 'os', 'hash', 'compress', 'decompress' ]

const entrance = async () => {
    const username = args.find((e) => e.includes('--username=')).replace('--username=', '');
    const welcome = `Welcome to the File Manager, ${username}!\n`;
    output.write(welcome);   
    output.write(`You are currently in ${__dirname}\n`);
    
    rl.on('line', (input) => {   
        const command = input.trim().split(' ');
        console.log(command);
        const operationIndex = operationList.indexOf(command[0]);
        console.log(operationIndex);
        switch (operationIndex) {
            case 0:
                output.write(`operation ${operationList[0]}\n`);                  
                break;
            case 1:
                output.write(`Thank you for using File Manager, ${username}!`); 
                rl.close();
                break;     
            case 2:
                output.write(`operation ${operationList[2]}\n`);                 
                break;   
            case 3:
                output.write(`operation ${operationList[3]}\n`);                 
                break;
            case 4:
                output.write(`operation ${operationList[4]}\n`);                 
                break; 
            case 5:
                output.write(`operation ${operationList[5]}\n`);                 
                break;
            case 6:
                output.write(`operation ${operationList[6]}\n`);                 
                break;     
            case 7:
                output.write(`operation ${operationList[7]}\n`);                 
                break;
            case 8:
                output.write(`operation ${operationList[8]}\n`);                
                break;
            case 9:
                output.write(`operation ${operationList[9]}\n`);                 
                break;
            case 10:
                output.write(`operation ${operationList[10]}\n`);                 
                break;
            case 11:
                output.write(`operation ${operationList[11]}\n`);                 
                break;
            case 12:
                output.write(`operation ${operationList[12]}\n`);                 
                break;
            case 13:
                output.write(`operation ${operationList[13]}\n`);                 
                break;
            default:
                output.write('Invalid input\n');
                break;
        }        
    }); 
};

entrance();