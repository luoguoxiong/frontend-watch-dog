import React from 'react';
import { getStatusColor } from '@/src/utils/getStatusColor';
interface ShowTimeIn{
  name: PerformanceInKey;
  value: number;
  style?: React.CSSProperties;
}

export const ShowTime: React.FC<ShowTimeIn> = ({ name, value, style }) => (
  <span style={{ color: getStatusColor(value, name), ...style ? style : {} }}>{value.toFixed(0)}
    <small>ms</small>
  </span>
);
