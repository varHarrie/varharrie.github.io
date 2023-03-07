import {
  SANDBOX_TEMPLATES,
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPredefinedTemplate,
  SandpackPreview,
  SandpackProvider,
  SandpackStack,
} from '@codesandbox/sandpack-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';

import { clamp } from '../utils';

type DragHandlerProps = {
  direction: 'horizontal' | 'vertical';
};

const DragHandler = styled.div<DragHandlerProps>`
  ${tw`absolute z-1`}
  ${({ direction }) =>
    direction === 'horizontal'
      ? tw`top-0 bottom-0 w-2 cursor-ew-resize`
      : tw`left-0 right-0 h-2 cursor-ns-resize`}
`;

const ConsoleWrapper = tw.div`w-full overflow-hidden`;

export type PlaygroundProps = {
  theme: 'dark' | 'light';
  code: string;
  template: SandpackPredefinedTemplate;
  autorun: string;
};

export default memo(function Playground(props: PlaygroundProps) {
  const { theme, code, template, autorun } = props;
  const entry = SANDBOX_TEMPLATES[template].main;

  const [horizontalSize, setHorizontalSize] = useState(50);
  const [verticalSize, setVerticalSize] = useState(70);

  const dragHandlerRef = useRef<HTMLDivElement>();

  const onDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    dragHandlerRef.current = e.target as HTMLDivElement;

    const container = dragHandlerRef.current.parentElement;
    container?.querySelectorAll<HTMLDivElement>('.sp-stack').forEach((el) => {
      el.style.pointerEvents = 'none';
    });
  }, []);

  const onDragMove = useCallback((e: MouseEvent) => {
    if (!dragHandlerRef.current?.parentElement) return;

    const container = dragHandlerRef.current.parentElement;
    const { direction } = dragHandlerRef.current.dataset;
    const { width, height, top, left } = container.getBoundingClientRect();

    if (direction === 'horizontal') {
      const size = ((e.clientX - left) / width) * 100;
      setHorizontalSize(clamp(size, 25, 75));
    } else {
      const size = ((e.clientY - top) / height) * 100;
      setVerticalSize(clamp(size, 25, 75));
    }
  }, []);

  const onDragEnd = useCallback(() => {
    if (!dragHandlerRef.current?.parentElement) return;

    const container = dragHandlerRef.current.parentElement;
    container?.querySelectorAll<HTMLDivElement>('.sp-stack').forEach((el) => {
      el.style.pointerEvents = 'auto';
    });

    dragHandlerRef.current = undefined;
  }, []);

  useEffect(() => {
    document.body.addEventListener('mousemove', onDragMove);
    document.body.addEventListener('mouseup', onDragEnd);

    return (): void => {
      document.body.removeEventListener('mousemove', onDragMove);
      document.body.removeEventListener('mouseup', onDragEnd);
    };
  }, []);

  return (
    <SandpackProvider
      theme={theme}
      template={template}
      options={{ autorun: autorun !== 'false' }}
      customSetup={{ entry }}
      files={{ [entry]: code }}
    >
      <SandpackLayout>
        <SandpackCodeEditor
          style={{
            height: 500,
            flexGrow: horizontalSize,
            flexShrink: horizontalSize,
            flexBasis: 0,
            overflow: 'hidden',
          }}
        />
        <DragHandler
          direction="horizontal"
          data-direction="horizontal"
          style={{ left: `calc(${horizontalSize}% - 5px)` }}
          onMouseDown={onDragStart}
        />
        <SandpackStack
          style={{
            height: 500,
            flexGrow: 100 - horizontalSize,
            flexShrink: 100 - horizontalSize,
            flexBasis: 0,
            width: 100 - horizontalSize + '%',
            gap: 1,
          }}
        >
          <SandpackPreview
            showOpenInCodeSandbox={false}
            style={{
              flexGrow: verticalSize,
              flexShrink: verticalSize,
              flexBasis: 0,
              overflow: 'hidden',
            }}
          />
          <DragHandler
            direction="vertical"
            data-direction="vertical"
            style={{ top: `calc(${verticalSize}% - 5px)` }}
            onMouseDown={onDragStart}
          />
          <ConsoleWrapper
            style={{
              flexGrow: 100 - verticalSize,
              flexShrink: 100 - verticalSize,
              flexBasis: 0,
            }}
          >
            <SandpackConsole resetOnPreviewRestart />
          </ConsoleWrapper>
        </SandpackStack>
      </SandpackLayout>
    </SandpackProvider>
  );
});
