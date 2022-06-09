import fs from 'fs';
import path from 'path';
import { cdFunc } from '../commands.js';

export const catFunc = async (dirname, link) => {
  const currentPath = await cdFunc(dirname, link);
  const parsePath = path.parse(currentPath);
  const myReadStream = fs.createReadStream(currentPath, 'utf8');
  myReadStream.pipe(process.stdout);
  myReadStream.on('error', (error) => {
    process.stdout.write('\x1b[35mOperation failed\n' + error.message)
  });
  myReadStream.on('close', () => {
    process.stdout.write(`\n\x1b[36mYou are currently in \x1b[4m\x1b[33m${dirname}\n\x1b[0m\x1b[37m`)
  });  
};
