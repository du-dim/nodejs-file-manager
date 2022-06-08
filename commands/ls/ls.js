import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

export const lsFunc = async (dirname) => {
  const arrFileName = [];
  try {		
    if (!fs.existsSync(dirname)) throw new Error();
      const data = await fsp.opendir(dirname);
      for await (const file of data) {
          arrFileName.push(file.name);
      }
      console.log(arrFileName);              
  } catch (err) {
    console.log('\x1b[35mOperation failed\n' + err.message);
  }
};