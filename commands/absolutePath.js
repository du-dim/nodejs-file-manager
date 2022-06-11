import path from 'path';

export const absolutePath = (dirname, link) => {
  if (!path.isAbsolute(link)) {
    return path.join(dirname, link);    
  } else  {
    const firstDir = dirname.split(/[\\\/]/)[0];
    const firstlink = link.split(/[\\\/]/)[0];
    if (firstlink === firstDir) {
      return path.normalize(link);
    } else {
      return path.join(firstDir, link);
    }
  };  
}
