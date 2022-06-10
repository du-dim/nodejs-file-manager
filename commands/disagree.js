export const disagree = async (lastСommand) => {
  switch (lastСommand) {
    case 'cp':
      process.stdout.write(`\x1b[36mCopying canceled!\n\x1b[0m`);
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