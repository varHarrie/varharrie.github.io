import React, { memo, useCallback, useState } from 'react';
import tw, { styled } from 'twin.macro';
import IconCode from '~icons/ri/code-s-slash-line';

import Console, { LogRecord } from './panes/Console';
import Editor from './panes/Editor';
import Preview from './panes/Preview';
import playgrounds, { PlaygroundType } from './playgrounds';

const Wrapper = tw.div`flex flex-col h-[800px] lg:h-[480px] rounded border border-gray-200 bg-white shadow-md overflow-hidden`;

const Toolbar = tw.div`px-4 flex items-center h-10 border-b border-gray-200 text-slate-600`;

const Title = tw.span`ml-2 flex-1 min-w-0`;

const TabButtonGroup = tw.div`ml-auto flex items-center justify-center`;

const TabButton = styled.a<{ active?: boolean }>`
  ${tw`ml-1 px-2 flex items-center justify-center h-7 leading-7 text-sm rounded-sm hover:bg-blue-50 cursor-pointer select-none transition-all duration-200`}
  ${({ active }) => active && tw`bg-blue-100! text-blue-600!`}
`;

const Container = tw.div`flex flex-1 flex-col lg:flex-row min-h-0`;

const TabPane = styled.div<{ visible?: boolean }>`
  :not(:first-of-type) {
    ${tw`border-t lg:border-t-0 lg:border-l border-gray-200`}
  }

  ${tw`relative hidden flex-1 h-full min-h-0 w-full min-w-0`}
  ${({ visible }) => visible && tw`block`}
`;

const allTabs = [
  { key: 'editor', title: 'Editor', visible: false },
  { key: 'preview', title: 'Preview', visible: false },
  { key: 'console', title: 'Console', visible: false },
];

export type PlaygroundProps = {
  type?: PlaygroundType;
  title?: string;
  lang?: string;
  code?: string;
};

export default memo(function Playground(props: PlaygroundProps) {
  const { type = 'js', title = type, lang = 'html', code = '' } = props;
  const [value, setValue] = useState(code);

  const { defaultTabs, sandbox } = playgrounds[type];
  const [activeTabs, setActiveTabs] = useState(() => [...defaultTabs]);

  const onTabToggle = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const { key } = (e.target as HTMLAnchorElement).dataset;
    if (!key) return;

    setActiveTabs((currentTabs) => {
      if (key === currentTabs[0] && currentTabs.length === 1) {
        return currentTabs;
      }

      return currentTabs.includes(key)
        ? currentTabs.filter((t) => t !== key)
        : [...currentTabs, key];
    });
  }, []);

  const [logs, setLogs] = useState<LogRecord[]>([]);

  const onLog = useCallback((log: LogRecord) => {
    setLogs((oldLogs) => {
      return [...oldLogs, log];
    });
  }, []);

  const onLogClear = useCallback(() => {
    setLogs([]);
  }, []);

  const onValueChange = useCallback((newValue: string) => {
    setValue(newValue);
    onLogClear();
  }, []);

  return (
    <Wrapper>
      <Toolbar>
        <IconCode />
        <Title>{title}</Title>
        <TabButtonGroup>
          {allTabs.map((tab) => (
            <TabButton
              key={tab.key}
              data-key={tab.key}
              active={activeTabs.includes(tab.key)}
              onClick={onTabToggle}
            >
              {tab.title}
            </TabButton>
          ))}
        </TabButtonGroup>
      </Toolbar>
      <Container>
        <TabPane visible={activeTabs.includes('editor')}>
          <Editor value={value} lang={lang} onChange={onValueChange} />
        </TabPane>
        <TabPane visible={activeTabs.includes('preview')}>
          <Preview code={value} sandbox={sandbox} onLog={onLog} />
        </TabPane>
        <TabPane visible={activeTabs.includes('console')}>
          <Console logs={logs} onClear={onLogClear} />
        </TabPane>
      </Container>
    </Wrapper>
  );
});
