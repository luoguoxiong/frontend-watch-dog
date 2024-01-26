interface DetailMsg{
  url: string;
  requestType: 'done' | 'error' | string;
  beginTime: string;
  endTime: string;
  open: boolean;
}
