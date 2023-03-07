import React from 'react';
import tw from 'twin.macro';

const Bone = tw.div`h-6 rounded bg-gray-200 dark:bg-gray-800 animate-pulse`;

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactElement;
};

export default function Skeleton(props: SkeletonProps) {
  return props.children ?? <Bone {...props} />;
}
