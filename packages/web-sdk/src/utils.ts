export const generateShortUUID = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let shortUUID = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortUUID += characters.charAt(randomIndex);
  }

  return shortUUID + Date.now();
};

export const getUrlQuery = () => {
  const isHash = location.hash;
  if(isHash){
    const link = location.hash.replace('#', '');
    const [pageUrl, query] = link.split('?');
    return {
      pageUrl,
      query: query || '',
      domain: location.host,
    };
  }else{
    return {
      query: location.search.replace('?', '') || '',
      pageUrl: location.pathname,
      domain: location.host,
    };
  }
};
