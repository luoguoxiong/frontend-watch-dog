import React, { } from 'react';
import { JsErrorDayLine, JsErrorSearch } from './components';
import { CodeShow } from '@/src/components';
const JsError = () => (
  <>
    <JsErrorDayLine />
    <JsErrorSearch/>
    <CodeShow
      start={10}
      hightLine="3">
      {
        `const JsError = () => (
  <>
    <JsErrorDayLine />
    <JsErrorSearch/>
    <CodeShow>
    </CodeShow>
  </>
);
`
      }
    </CodeShow>
  </>
);

export default JsError;
