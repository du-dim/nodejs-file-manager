export const helpFunc = () => {
  function Person(command, description) {
    this.Command = command;
    this.Description = description;
  }
  const exit = new Person('.exit', 'Exit from the File Manager');
  const up = new Person('up', 'Go upper from current directory');
  const cd = new Person('cd path_to_directory', 'Go to dedicated folder from current directory');
  const ls = new Person('ls', 'List all files and folder in current directory and print it to console');
  const cat = new Person('cat path_to_file', 'Read file and print it\'s content in console');
  const add = new Person('add new_file_name', 'Create empty file in current working directory');
  const rn = new Person('rn path_to_file new_filename', 'Rename file');
  const cp = new Person('cp path_to_file path_to_new_directory', 'Copy file');
  const mv = new Person('mv path_to_file path_to_new_directory', 'Move file (same as copy but initial file is deleted)');
  const rm = new Person('mv path_to_file path_to_new_directory', 'Delete file');
  const osEOL = new Person('os --EOL', 'Operating system info. Get EOL (default system End-Of-Line)');
  const osCPU = new Person('os --cpus', 'Operating system info. Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)');
  const osHomedir = new Person('os --homedir', 'Operating system info. Get home directory');
  const osUsername = new Person('os --username', 'Operating system info. Get current system user name');
  const osArchitecture = new Person('os --architecture', 'Operating system info. Get CPU architecture for which Node.js binary has compiled');
  const hash = new Person('hash path_to_file', 'Calculate hash for file and print it into console');  
  const compress = new Person('compress path_to_file path_to_destination', 'Compress file');
  const decompress = new Person('decompress path_to_file path_to_destination', 'Decompress file');
 
  const commands = [exit, up, cd, ls, cat, add, rn, cp, mv, rm, osEOL, osCPU, osHomedir, osUsername, osArchitecture, hash, compress, decompress]
  console.table(commands);
};