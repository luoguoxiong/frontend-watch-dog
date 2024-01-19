import React from 'react';

interface ShowTimeIn{
  name: 'whiteTime' | 'fcp' | 'lcp' | 'fid' |'ttfb' | 'dnsTime' | 'tcpTime';
  value: number;
  style?: React.CSSProperties;
}

const PerformanceRange = {
  whiteTime: [1000, 2000, 3000],
  fcp: [1000, 2000, 3000],
  lcp: [1000, 2500, 4000],
  fid: [100, 300, 500],
  ttfb: [100, 300, 500],
  dnsTime: [500, 2000],
  tcpTime: [500, 2000],
};
export const ShowTime: React.FC<ShowTimeIn> = ({ name, value, style }) => {
  const getScoreColor = (score: number, range: number[]) => {
    const color = ['#1f8800', '#49de78', '#f9aa35', '#c33300'];
    let index = 0;
    while(index < range.length){
      if(score < range[index]){
        return color[index];
      }
      index++;
    }
    return color[index];
  };
  return (
    <span style={{ color: getScoreColor(value, PerformanceRange[name] || []), ...style ? style : {} }}>{value.toFixed(0)}
      <small>ms</small>
    </span>
  );
};
