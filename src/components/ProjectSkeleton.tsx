import React from 'react';
import tw from 'twin.macro';

import Skeleton from './Skeleton';

const Wrapper = tw.div`
  relative p-3 pl-14
  bg-white dark:bg-gray-900 rounded-md ring-1 ring-slate-600/5 shadow-sm hover:shadow-lg
  transition-all duration-300
`;

const Icon = tw(Skeleton)`absolute top-3 left-3 w-9 h-9 rounded-md`;

const Title = tw(Skeleton)`w-1/2 h-5 text-blue-200`;

const Description = tw(Skeleton)`mt-2 w-2/3`;

const CountList = tw.div`mt-2 flex`;

const CountItem = tw(Skeleton)`mr-4 w-10 h-5`;

export default function ProjectSkeleton() {
  return (
    <Wrapper>
      <Icon />
      <Title />
      <Description />
      <CountList>
        {Array.from({ length: 3 }).map((_, i) => (
          <CountItem key={i} />
        ))}
      </CountList>
    </Wrapper>
  );
}
