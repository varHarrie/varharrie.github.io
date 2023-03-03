import React from 'react';
import tw from 'twin.macro';

import Skeleton from './Skeleton';

const Wrapper = tw.div`flex flex-col justify-center h-20 border-t  border-dotted border-gray-300 dark:border-gray-800`;

const Row = tw.div`flex items-center`;

const Left = tw.div`hidden lg:block w-36 text-sm text-right`;

const Right = tw.div`ml-4 flex-1 min-w-0 truncate`;

export default function ArticleSkeleton() {
  const titleWidth = `${50 + Math.random() * 50}%`;
  const labelCount = Math.floor(Math.random() * 3) + 1;

  return (
    <Wrapper>
      <Row>
        <Left>
          <Skeleton />
        </Left>
        <Right>
          <Skeleton style={{ width: titleWidth }} />
        </Right>
      </Row>
      <Row tw="mt-1">
        <Left>
          <Skeleton tw="inline-block w-10" />
        </Left>
        <Right tw="flex">
          {Array.from({ length: labelCount }).map((_, i) => (
            <Skeleton key={i} tw="mr-4 w-10" />
          ))}
        </Right>
      </Row>
    </Wrapper>
  );
}
