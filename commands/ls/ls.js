import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

export const lsFunc = async (dirname) => {  
  try {		
    if (!fs.existsSync(dirname)) throw new Error();
    const data = await fsp.opendir(dirname);
      for await (const file of data) {
          fs.stat(path.join(dirname, file.name), function(err, stats) {
            if (stats.isFile()) {
                process.stdout.write(`\x1b[32m${file.name}\n`);
            } else {
                process.stdout.write(`\x1b[33m${file.name}\n`);
            }
        });
      }                    
  } catch (err) {
    process.stdout.write('\x1b[35mOperation failed\n' + err.message + '\n\x1b[0m');
  }
};