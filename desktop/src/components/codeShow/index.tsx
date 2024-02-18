import React, { useEffect } from 'react';
import Prism from 'prismjs';
import './index.less';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

interface CodeShowIn {
  hightLine?: number;
  children: string;
  start?: number;
}
export const CodeShow: React.FC<CodeShowIn> = ({ children, hightLine, start }) => {
  useEffect(() => {
    Prism.highlightAll(false, () => {
      const lineNumer = document.getElementsByClassName('line-numbers')[0];
      lineNumer.setAttribute('style', `counter-reset: linenumber ${start - 1}`);
      const highlight = document.getElementsByClassName('line-highlight')[0];
      const styles = highlight.getAttribute('style');
      highlight.setAttribute('style', `${styles };background: rgba(0,255,155,30%)`);
    });
  }), [];
  return (
    <pre
      data-line={hightLine || false}>
      <code
        className="language-language-javascript line-numbers"
      >{children}
      </code>
    </pre>
  );
};
