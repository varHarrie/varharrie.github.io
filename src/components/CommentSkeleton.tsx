import React from 'react';
import tw from 'twin.macro';

import Skeleton from './Skeleton';

const Wrapper = tw.div`relative mt-8 pt-8 pl-12 border-t border-gray-300 dark:border-gray-800`;

export default function CommentSkeleton() {
  return (
    <Wrapper>
      <Skeleton tw="absolute top-8 left-0 w-8 h-8 rounded-full" />
      <Skeleton tw="mb-2 w-1/3" />
      <div tw="space-y-2">
        <Skeleton tw="w-full" />
        <Skeleton tw="w-3/5" />
      </div>
    </Wrapper>
  );
}
