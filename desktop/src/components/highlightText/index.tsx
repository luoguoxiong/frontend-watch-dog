import React from 'react';

interface HighlightTextIn{
  text: string;
  searchTerm: string;
}

const HighlightTextCom: React.FC<HighlightTextIn> = ({ text, searchTerm }) => {
  const index = text.indexOf(searchTerm);
  if(index === -1 || searchTerm === '') return text;
  const start = text.substring(0, index);
  const end = text.substring(index + searchTerm.length, text.length);
  return<> {start}<span style={{ color: '#1677ff' }}>{searchTerm}</span>{end}</>;
};

export const HighlightText = React.memo(HighlightTextCom, (prev, next) => prev.text !== next.text && prev.searchTerm !== next.searchTerm);
