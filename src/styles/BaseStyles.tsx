import { Global } from '@emotion/react';
import React from 'react';
import tw, { css, GlobalStyles } from 'twin.macro';

const customStyles = css`
  @import url(https://cdn.jsdelivr.net/gh/tonsky/FiraCode@5.2/distr/fira_code.css);

  html {
    font-family: 'Fira Code VF', 'Segoe UI', 'Consolas', 'monospace',
      'Microsoft YaHei';
    font-variant-ligatures: normal;
    ${tw`overflow-y-scroll antialiased bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-500`}
  }

  *::-webkit-scrollbar {
    ${tw`w-2 h-2`}
  }

  *::-webkit-scrollbar-thumb {
    ${tw`bg-gray-200 dark:bg-gray-900`}
  }
`;

function BaseStyles() {
  return (
    <>
      <GlobalStyles />
      <Global styles={customStyles} />
    </>
  );
}

export default BaseStyles;
