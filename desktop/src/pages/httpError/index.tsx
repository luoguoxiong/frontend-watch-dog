import React from 'react';
import { HttpErrorDayLine, HighFrequency, HttpSlow } from './components';

const HttpError = () => (
  <>
    <HttpErrorDayLine/>
    <HighFrequency />
    <HttpSlow />
  </>
);
export default HttpError;
