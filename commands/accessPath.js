import fs from 'fs';
import { constants } from 'fs';
const fsp = fs.promises;
/*
export const accessPath = (pathFile) => {
  return new Promise((resolve, reject) => {
    return fsp.access(pathFile, constants.F_OK | constants.W_OK, (err) => {
      if(!err) return resolve(true);      
      if(err) return resolve(false);      
    });
  });
}

/*
export const accessPath = (pathFile) => {
  try {
    fsp.access(pathFile, constants.F_OK | constants.W_OK, (err) => {
      if (err.code === 'ENOENT') return true;
      return false;
    });
  } catch (error) {
    console.log(`${error}`);
  }  
}
*/

export const accessPath = async (pathFile) => {
  try {
    return await fsp.stat(pathFile);    
  } catch (err) {    
  } 
}
