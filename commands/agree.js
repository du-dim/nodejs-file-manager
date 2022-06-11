export const agree = async (lastСommand) => {
  switch (lastСommand) {
    case 'cp':
      process.stdout.write(`\x1b[36mFile successfully overwritten!\n\x1b[0m`);
      break;
    case 'mv':
      process.stdout.write(`\x1b[36mFile successfully overwritten!\n\x1b[0m`);
      break;
    case 'y':
      process.stdout.write('\x1b[35mInvalid input\n\x1b[0m');
      break;
    case 'n':
      process.stdout.write('\x1b[35mInvalid input\n\x1b[0m');
      break;        
    default:
      process.stdout.write('\x1b[35mInvalid\n\x1b[0m');      
      break;
  }
}