// helper function
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()              
    .trim()                   
    .replace(/[\s\W-]+/g, "-"); 
};
