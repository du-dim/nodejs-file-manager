import os from 'os';

export const osFunc = async (text) => {
  try {
    if (text.trim().length < 1) throw Error('\x1b[35mInvalid input\x1b[0m');    
    const codeSplit = text.split('--');
    const code = codeSplit.join('');
    const result = {EOL, cpus, homedir, username, architecture};
    const check = Object.keys(result).includes(code); 
    
    if (codeSplit.length > 1) throw Error('\x1b[35mInvalid input\n\x1b[0m');
    if (codeSplit.length > 1) throw Error('\x1b[35mInvalid input\n\x1b[0m');
    if (!check) throw Error('\x1b[35mInvalid input\n\x1b[0m');

    const resultCPU = [];
    const cpus = os.cpus();  
    const amountCPUS = `\x1b[36mTotal number of CPUs:\x1b[33m ${os.cpus().length}\n\x1b[0m`;

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
      EOL: [amountCPUS, JSON.stringify(os.EOL)],
      cpus: resultCPU,
      homedir: os.homedir(),
      username: os.userInfo().username,
      architecture: os.arch(),
    }     
  } catch (error) {
    console.log(error.message)    
  }  

};