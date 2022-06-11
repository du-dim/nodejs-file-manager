import fs from 'fs';
const fsp = fs.promises;

export const accessPath = async (pathFile) => {
  try {
    return await fsp.stat(pathFile);    
  } catch (err) {    
  } 
}
