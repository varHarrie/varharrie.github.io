import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, To } from 'react-router-dom';
import tw from 'twin.macro';
import IconComments from '~icons/ri/chat-2-line';

import ArticleModel from '../models/ArticleModel';
import LabelItem from './LabelItem';

const Wrapper = tw.div`flex flex-col justify-center h-20 border-t  border-dotted border-gray-300 dark:border-gray-800`;

const Row = tw.div`flex items-center`;

const Left = tw.div`hidden lg:block w-36 text-sm text-slate-400 dark:text-slate-600 text-right`;

const Right = tw.div`ml-4 flex-1 min-w-0 truncate`;

export type ArticleItemProps = {
  article: ArticleModel;
  getLink: (id: number) => To;
  getLabelLink: (label: string) => To;
};

export default function ArticleItem(props: ArticleItemProps) {
  const { article, getLink, getLabelLink } = props;

  const { t } = useTranslation();

  const createdAt = useMemo(() => format(new Date(article.createdAt), t('dateFormat')), [article]);

  return (
    <Wrapper>
      <Row>
        <Left>{createdAt}</Left>
        <Right>
          <Link to={getLink(article.number)}>{article.title}</Link>
        </Right>
      </Row>
      <Row tw="mt-1">
        <Left>
          <IconComments tw="inline mr-2" />
          {article.comments}
        </Left>
        <Right tw="flex text-sm text-slate-400">
          {article.labels.map((label) => (
            <LabelItem key={label.id} label={label} getLink={getLabelLink} />
          ))}
        </Right>
      </Row>
    </Wrapper>
  );
}
