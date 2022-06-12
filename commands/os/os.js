import os from 'os';

export const osFunc = async (text) => {
  try {    
    if (text.trim().length < 1) throw Error('\x1b[35mInvalid input\x1b[0m');    
    const codeSplit = text.split('--');   
    const code = codeSplit.join('');   
    let result = { EOL: undefined, cpus: undefined, homedir: undefined, username: undefined, architecture: undefined};    
    const check = Object.keys(result).includes(code); 
    
    if (codeSplit.length !== 2) throw Error('\x1b[35mInvalid input\n\x1b[0m');   
    if (!check) throw Error('\x1b[35mInvalid input\n\x1b[0m');

    const resultCPU = [];
    const cpus = os.cpus();  
    const amountCPUS = `Total number of CPUs: ${os.cpus().length}`;

    let count = 0;
    for await (const item of cpus) {
      count++;    
      const cpu_No = count; 
      const model= item.model;
      const speed = `${item.speed/1000} GHz`;
      const objCPU = { cpu_No, model, speed };
      resultCPU.push(objCPU);    
    }      
      result = {
      EOL: JSON.stringify(os.EOL),
      cpus:  [amountCPUS, resultCPU],
      homedir: os.homedir(),
      username: os.userInfo().username,
      architecture: os.arch(),
    } 
    
    console.log(result[code])

  } catch (error) {
    console.log(error.message)    
  }  

};