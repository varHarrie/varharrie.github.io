import { format } from 'date-fns';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';
import IconComments from '~icons/ri/chat-2-line';

import CommentItem from '../components/CommentItem';
import CommentSkeleton from '../components/CommentSkeleton';
import LabelItem from '../components/LabelItem';
import MarkdownHtml from '../components/MarkdownHtml';
import Pagination from '../components/Pagination';
import Skeleton from '../components/Skeleton';
import useHandling from '../hooks/use-handling';
import useQuery from '../hooks/use-query';
import ArticleModel from '../models/ArticleModel';
import CommentModel from '../models/CommentModel';
import github from '../services/github';
import { createQueryURL } from '../utils';

const Wrapper = tw.article`mx-auto w-full max-w-screen-lg px-8 py-12`;

const Title = tw.h2`text-2xl text-slate-700`;

const Into = tw.div`mt-4 mb-8 space-x-4 flex flex-wrap content-center text-sm text-slate-400`;

const ParagraphSkeleton = tw.ul`mt-8 space-y-4`;

const CommentTitle = tw.h2`text-2xl text-slate-700`;

const CommentButton = tw.a`
  mt-4 block w-full h-10
  leading-10 text-slate-400 text-center
  border border-gray-400 rounded-sm outline-none
  cursor-pointer 
`;

const Foot = tw.div`mt-8 flex justify-center`;

function useArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState<ArticleModel>();

  const [loading, load] = useHandling(
    useCallback(async () => {
      const result = await github.getIssue(parseInt(id!, 10));
      setArticle(ArticleModel.from(result));
    }, [id]),
    true,
  );

  useEffect(() => {
    load();
  }, [id]);

  return [loading, article] as const;
}

function useCommentsQuery() {
  const { id } = useParams();
  const { page } = useQuery();

  return useMemo(
    () => ({
      issue: parseInt(id!, 10),
      page: parseInt(page ?? '1', 10),
      pageSize: parseInt(import.meta.env.VITE_COMMENT_PAGE_SIZE, 10),
    }),
    [id, page],
  );
}

function useComments() {
  const query = useCommentsQuery();
  const [comments, setComments] = useState<CommentModel[]>([]);

  const [loading, load] = useHandling(
    useCallback(async () => {
      const result = await github.listComments(query);

      setComments(result.map(CommentModel.from));
    }, [query]),
    true,
  );

  useEffect(() => {
    load();
  }, [query]);

  return [loading, comments, query] as const;
}

export default memo(function Article() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [articleLoading, article] = useArticle();
  const [commentsLoading, comments, query] = useComments();

  const createdAt = useMemo(() => {
    return article ? format(new Date(article.createdAt), t('dateFormat')) : '';
  }, ['article']);

  const newCommentUrl = useMemo(() => {
    return article ? `${article.htmlUrl}#new_comment_field` : '';
  }, [article]);

  const getLabelLink = useCallback((label: string) => {
    return `../${createQueryURL({ label, page: 1 })}`;
  }, []);

  const onPageChange = useCallback((page: number) => {
    navigate(createQueryURL({ page }));
  }, []);

  return (
    <Wrapper>
      <article>
        {articleLoading && (
          <>
            <Skeleton tw="h-8 w-1/3" />
            <ParagraphSkeleton>
              <Skeleton tw="w-1/2" />
              <Skeleton tw="w-full" />
              <Skeleton tw="w-4/5" />
              <Skeleton tw="w-full" />
              <Skeleton tw="w-3/5" />
              <Skeleton tw="w-full h-40" />
              <Skeleton tw="w-4/5" />
              <Skeleton tw="w-full" />
              <Skeleton tw="w-3/5" />
              <Skeleton tw="w-full" />
              <Skeleton tw="w-2/5" />
            </ParagraphSkeleton>
          </>
        )}

        {article && (
          <>
            <Title>{article.title}</Title>
            <Into>
              <span>{createdAt}</span>
              <span tw="flex items-center">
                {article.labels.map((label) => (
                  <LabelItem key={label.id} label={label} getLink={getLabelLink} />
                ))}
              </span>
              <span tw="flex items-center">
                <IconComments />
                <span tw="ml-1">{article.comments}</span>
              </span>
            </Into>
            <MarkdownHtml markdown={article.body} playground />
          </>
        )}
      </article>

      <section tw="mt-8">
        <CommentTitle>{t('comment.title')}</CommentTitle>
        <CommentButton href={newCommentUrl}>{t('comment.btn')}</CommentButton>

        {commentsLoading && (
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <CommentSkeleton key={i} />
            ))}
          </div>
        )}

        {!!comments.length && (
          <div>
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        )}

        <Foot>
          <Pagination
            page={query.page}
            pageSize={query.pageSize}
            total={article ? article.comments : 0}
            onChange={onPageChange}
          />
        </Foot>
      </section>
    </Wrapper>
  );
});
