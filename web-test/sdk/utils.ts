export const getXmlHttpSend = (body: any) => {
  if(body === null ){
    return 'null';
  }
  if(typeof body === 'string'){
    return body;
  }
  if (body instanceof Blob) {
    return 'Blob File';
  } else if (body instanceof ArrayBuffer) {
    return 'ArrayBuffer';
  } else if (body instanceof Document) {
    return 'Document';
  } else if (typeof body === 'object') {
    return JSON.stringify(body);
  }
};
