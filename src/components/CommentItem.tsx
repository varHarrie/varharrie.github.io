import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import CommentModel from '../models/CommentModel';
import MarkdownHtml from './MarkdownHtml';

const Wrapper = tw.div`relative mt-8 pt-8 pl-12 border-t border-gray-300 dark:border-gray-800`;

const Avatar = tw.div`absolute top-8 left-0 w-8 h-8 rounded-full overflow-hidden`;

const Header = tw.header`mb-2 space-x-4 flex items-center text-sm`;

const OwnerTag = tw.span`px-1 text-xs text-white leading-5 rounded-sm bg-blue-500`;

export type CommentItemProps = {
  comment: CommentModel;
};

export default function CommentItem(props: CommentItemProps) {
  const { comment } = props;
  const { t } = useTranslation();

  const createdAt = useMemo(() => {
    return format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm:ss');
  }, ['article']);

  const link = useMemo(() => {
    const { origin, pathname } = window.location;
    return [origin, pathname, `#${comment.id}`].join('');
  }, [comment]);

  return (
    <Wrapper>
      <Avatar>
        <img src={comment.user.avatarUrl} alt="Avatar" />
      </Avatar>
      <Header>
        <a href={comment.user.htmlUrl}>{comment.user.login}</a>
        {comment.authorAssociation === 'OWNER' && <OwnerTag>{t('comment.owner')}</OwnerTag>}
        <a href={link} tw="opacity-40 text-xs">
          {createdAt}
        </a>
      </Header>
      <MarkdownHtml markdown={comment.body} />
    </Wrapper>
  );
}
