import React, { useCallback, useMemo } from 'react';
import tw, { styled } from 'twin.macro';
import IconArrowLeft from '~icons/ri/arrow-left-s-line';
import IconArrowRight from '~icons/ri/arrow-right-s-line';

import { clamp } from '../utils';

const RADIUS = 2;
const RANGE = 2 * RADIUS;

const List = tw.ul`space-x-4 flex items-center`;

const Item = styled.li<{ active?: boolean; disabled?: boolean }>`
  ${tw`w-8 h-8 flex items-center justify-center rounded-sm text-slate-300  cursor-pointer`}
  ${({ active }) => active && tw`bg-blue-500 text-white`}
  ${({ disabled }) => disabled && tw`opacity-30 cursor-not-allowed`}
`;

export type PaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onChange?: (page: number) => void;
};

export default function Pagination(props: PaginationProps) {
  const { page, pageSize, total, onChange } = props;

  const totalPages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);

  const pages = useMemo(() => {
    if (totalPages < 1) return [];

    const start = clamp(
      page + RADIUS > totalPages ? totalPages - RANGE : page - RADIUS,
      1,
      totalPages,
    );

    const end = clamp(start + RANGE, start, totalPages);
    const length = end - start + 1;

    return Array.from({ length }).map((_, i) => start + i);
  }, [page, totalPages]);

  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  const onGoto = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const to = (e.target as HTMLLIElement).dataset.page;
      if (to) onChange?.(parseInt(to, 10));
    },
    [onChange],
  );

  const onPrevious = useCallback(() => {
    if (hasPrevious) onChange?.(page - 1);
  }, [page, hasPrevious, onChange]);

  const onNext = useCallback(() => {
    if (hasNext) onChange?.(page + 1);
  }, [page, hasNext, onChange]);

  if (totalPages <= 0) return null;

  return (
    <List>
      <Item disabled={!hasPrevious} onClick={onPrevious}>
        <IconArrowLeft />
      </Item>
      {pages.map((i) => (
        <Item key={i} active={i === page} onClick={onGoto} data-page={i}>
          {i}
        </Item>
      ))}
      <Item disabled={!hasNext} onClick={onNext}>
        <IconArrowRight />
      </Item>
    </List>
  );
}
