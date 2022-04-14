import React, { memo, useCallback, useEffect, useRef } from 'react';
import tw from 'twin.macro';

import { ensureArray } from '../../../utils';
import JsSandbox, { SandboxInstance } from '../sandboxes/Sandbox';
import { LogRecord } from './Console';

const Wrapper = tw.div`p-4 w-full h-full`;

export type PreviewProps = {
  code: string;
  sandbox: SandboxInstance;
  onLog?: (log: LogRecord) => void;
};

export default memo(function Preview(props: PreviewProps) {
  const { code, sandbox: Sandbox, onLog } = props;

  const container = useRef<HTMLDivElement | null>(null);
  const sandbox = useRef<JsSandbox>();

  const onMessage = useCallback(
    (e: MessageEvent) => {
      const { args } = e.data;
      onLog?.({ level: args.level, message: ensureArray(args.message) });
    },
    [onLog]
  );

  useEffect(() => {
    if (container.current) {
      sandbox.current = new Sandbox();
      sandbox.current.mount(container.current, code);
      window.addEventListener('message', onMessage);
    }

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  useEffect(() => {
    sandbox.current?.update(code);
  }, [code]);

  return <Wrapper ref={container} />;
});
