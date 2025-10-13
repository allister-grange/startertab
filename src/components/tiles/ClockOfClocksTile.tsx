type PageProps = {
  tileId: number;
};

export const ClockOfClocksTile: React.FC<PageProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;

  return <div style={{ color }}>I am a clock</div>;
};
