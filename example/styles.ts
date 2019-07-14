export const noGaps = `
margin: 0;
padding: 0;
`;

export const size = (size: number, unit: 'rem' | 'px' | '%') => `
width: ${size}${unit};
height: ${size}${unit};
`;
