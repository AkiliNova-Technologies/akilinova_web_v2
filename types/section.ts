export type WaveStyle = 'wave1' | 'wave2' | 'wave3' | 'curve' | 'slanted' | 'steps';
export type WavePosition = 'top' | 'bottom' | 'both';

export interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  waveStyle?: WaveStyle;
  wavePosition?: WavePosition;
  waveColor?: string;
  backgroundColor?: string;
  waveHeight?: number;
  waveFlip?: boolean;
  containerMaxWidth?: string;
  padding?: string;
}