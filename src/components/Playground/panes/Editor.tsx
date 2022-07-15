import copy from 'copy-text-to-clipboard';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import tw, { styled } from 'twin.macro';

import IconCheck from '~icons/ri/checkbox-circle-fill';
import IconCopy from '~icons/ri/file-copy-2-line';

import { highlight } from '../../../utils';

const Wrapper = tw.label`relative p-4 block h-full box-border overflow-auto`;

const Content = tw.div`absolute`;

const sharedStyles = tw`whitespace-pre! text-base! leading-6! font-family[inherit]!`;

const Textarea = styled.textarea`
  ${sharedStyles};
  ${tw`absolute top-0 left-0 w-full h-full bg-transparent border-none outline-none resize-none overflow-hidden`}
  -webkit-text-fill-color: transparent;
`;

const Preview = styled.pre`
  ${sharedStyles};
  ${tw`relative m-0 p-0 pointer-events-none`}
  ${tw`bg-transparent! p-0! overflow-visible!`}
`;

const CopyButton = tw.span`
  absolute bottom-4 right-4
  flex w-9 h-9 items-center justify-center
  hover:text-blue-500 border-gray-50 border rounded-full bg-white shadow-md
  cursor-pointer
`;

const FadeTransition = styled(CSSTransition)`
  &.fade-enter {
    opacity: 0;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-enter-active {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
  }
  &.fade-enter-active,
  &.fade-exit-active {
    transition: opacity 150ms;
  }
`;

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number>();

  const onCopy = useCallback(() => {
    setCopied(copy(text));
    if (copyTimer.current) clearTimeout(copyTimer.current);

    copyTimer.current = setTimeout(() => {
      setCopied(false);
      copyTimer.current = undefined;
    }, 2000);
  }, [text]);

  return [copied, onCopy] as const;
}

export type EditorProps = {
  value: string;
  lang: string;
  onChange?: (value: string) => void;
};

export default memo(function Editor(props: EditorProps) {
  const { value, lang, onChange } = props;
  const [highlighted, setHighlighted] = useState('');

  useEffect(() => {
    setHighlighted(highlight(value, lang));
  }, [value, lang]);

  const onTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      onChange?.(newValue);
    },
    [onChange]
  );

  const [copied, onCopy] = useCopy(value);

  return (
    <>
      <Wrapper>
        <Content>
          <Textarea
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            value={value}
            onInput={onTextareaChange}
          />
          <Preview dangerouslySetInnerHTML={{ __html: highlighted }} />
        </Content>
      </Wrapper>
      <CopyButton title="Copy" onClick={onCopy}>
        <SwitchTransition>
          <FadeTransition
            key={`${copied}`}
            classNames="fade"
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
          >
            {copied ? (
              <IconCheck tw="text-green-500" />
            ) : (
              <IconCopy tw="hover:text-blue-500" />
            )}
          </FadeTransition>
        </SwitchTransition>
      </CopyButton>
    </>
  );
});
