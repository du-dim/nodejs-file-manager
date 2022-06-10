import fs from 'fs';
import { absolutePath } from "../cd/cd.js";

export const rmFunc = async (dirname, link) => {
  const currentPath = absolutePath(dirname, link);
  try {		
		if (!fs.existsSync(currentPath)) throw Error(`\x1b[32m${currentPath}\x1b[35m is not found!\x1b[0m`);
    await fs.promises.rm(currentPath, { recursive: true });
	} catch (error) {
		process.stdout.write('\x1b[35mOperation failed\n' + error.message + '\n\x1b[0m');
	}   
};