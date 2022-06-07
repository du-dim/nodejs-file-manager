import readline from 'readline';

const args = process.argv.slice(2);
const input = process.stdin;
const output = process.stdout;
const rl = readline.createInterface({ input, output });

const entrance = async () => {
   const username = args.find((e) => e.includes('--username=')).replace('--username=', '');
   const welcome = `Welcome to the File Manager, ${username}!\n`;
   output.write(welcome);   
   rl.on('line', (input) => {       
    output.write(input + '\n');
  }); 
};

entrance();