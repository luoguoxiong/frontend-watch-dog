import React from 'react';
import { usePerformanceColors } from '@/src/hooks/usePerformanceColors';

interface ShowTimeIn{
  name: PerformanceInKey;
  value: number;
  style?: React.CSSProperties;
}

export const ShowTime: React.FC<ShowTimeIn> = ({ name, value, style }) => {
  const { getColor } = usePerformanceColors();
  return (
    <span style={{ color: getColor(value, name), ...style ? style : {} }}>{value.toFixed(0)}
      <small>ms</small>
    </span>
  );
};
