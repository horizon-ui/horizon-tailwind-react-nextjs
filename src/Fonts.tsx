import React from 'react';

export default function Fonts() {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
            @font-face {
              font-family: 'DM Sans';
              font-style: italic;
              font-weight: 400;
              font-display: swap;
              src: url('${
                prefix + '/fonts/dm-sans/DMSans-Italic.ttf'
              }') format('truetype');
            }
            
            @font-face {
              font-family: 'DM Sans';
              font-style: italic;
              font-weight: 700;
              font-display: swap;
              src: url('${
                prefix + '/fonts/dm-sans/DMSans-BoldItalic.ttf'
              }') format('truetype');
            }
            
            @font-face {
              font-family: 'DM Sans';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url('${
                prefix + '/fonts/dm-sans/DMSans-Regular.ttf'
              }) format('truetype');
            }
            
            @font-face {
              font-family: 'DM Sans';
              font-style: normal;
              font-weight: 500;
              font-display: swap;
              src: url('${
                prefix + '/fonts/dm-sans/DMSans-Medium.ttf'
              }) format('truetype');
            }
            
            @font-face {
              font-family: 'DM Sans';
              font-style: normal;
              font-weight: 700;
              font-display: swap;
              src: url('${
                prefix + '/fonts/dm-sans/DMSans-Bold.ttf'
              }) format('truetype');
            }
          `,
      }}
    />
  );
}
