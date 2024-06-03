export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export const getDarkerColor = (hex: string, amount: number = 30) => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }
  const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - amount)
    .toString(16)
    .padStart(2, '0');
  const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - amount)
    .toString(16)
    .padStart(2, '0');
  const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - amount)
    .toString(16)
    .padStart(2, '0');

  return `#${r}${g}${b}`;
};

export const getLayerRadius = (layerIndex: number, totalLayers: number, maxRadius: number) => {
  return ((layerIndex + 1) / totalLayers) * maxRadius;
};
