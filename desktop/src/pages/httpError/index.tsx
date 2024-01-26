import React, { useState } from 'react';
import { HttpErrorDayLine, HighFrequency, HttpSlow, HttpDetail } from './components';

const initDetail = {
  url: '',
  requestType: 'done',
  beginTime: '',
  endTime: '',
  open: false,
};

const HttpError = () => {
  const [detail, setDetail] = useState(initDetail);
  const onClose = () => {
    setDetail(initDetail);
  };
  return (
    <>
      <HttpErrorDayLine/>
      <HighFrequency setDetail={(detail: DetailMsg) => {
        setDetail({
          ...detail,
          open: true,
        });
      }} />
      <HttpSlow setDetail={(detail: DetailMsg) => {
        setDetail({
          ...detail,
          open: true,
        });
      }} />
      <HttpDetail
        detail={detail}
        onClose={onClose} />
    </>
  );
};
export default HttpError;
