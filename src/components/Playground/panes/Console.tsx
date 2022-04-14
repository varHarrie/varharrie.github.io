import React, { memo } from 'react';
import tw, { styled } from 'twin.macro';

import IconRight from '~icons/ri/arrow-right-s-line';
import IconFatal from '~icons/ri/bug-fill';
import IconError from '~icons/ri/close-circle-fill';
import IconClear from '~icons/ri/delete-bin-line';
import IconWarning from '~icons/ri/error-warning-fill';

const List = tw.ul`m-0 p-0 w-full h-full overflow-auto leading-4 text-sm`;

const Item = styled.li`
  ${tw`p-1 flex items-center text-gray-600 border-b border-gray-100  border-solid`}

  &.info {
    ${tw`text-blue-500`}
  }

  &.warn {
    ${tw`text-yellow-500`}
  }

  &.error {
    ${tw`text-red-500`}
  }
`;

const ClearButton = tw.span`
  absolute bottom-4 right-4
  flex w-9 h-9 items-center justify-center
  hover:text-blue-500 border-gray-50 border rounded-full bg-white shadow-md
  cursor-pointer
`;

export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'fatal';

export type LogRecord = {
  level: LogLevel;
  message: string[];
  extras?: unknown;
};

const icons = {
  log: IconRight,
  info: IconRight,
  warn: IconWarning,
  error: IconError,
  fatal: IconFatal,
};

const renderIcon = (level: LogLevel) => {
  const Icon = icons[level];
  return <Icon tw="mr-1 opacity-80 text-sm" />;
};

export type ConsoleProps = {
  logs: LogRecord[];
  onClear?: () => void;
};

export default memo(function Console(props: ConsoleProps) {
  const { logs, onClear } = props;

  return (
    <>
      <List>
        {logs.map((log, i) => (
          <Item className={log.level} key={i}>
            {renderIcon(log.level)}
            {log.message.map((msg, j) => (
              <span key={j}>{msg}</span>
            ))}
          </Item>
        ))}
      </List>
      <ClearButton onClick={onClear}>
        <IconClear />
      </ClearButton>
    </>
  );
});
