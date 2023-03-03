import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import ArticleItem from '../components/ArticleItem';
import ArticleSkeleton from '../components/ArticleSkeleton';
import Pagination from '../components/Pagination';
import Skeleton from '../components/Skeleton';
import useHandling from '../hooks/use-handling';
import useQuery from '../hooks/use-query';
import ArticleModel from '../models/ArticleModel';
import CategoryModel from '../models/CategoryModel';
import github from '../services/github';
import { createQueryURL } from '../utils';

const Wrapper = tw.main`mx-auto w-full max-w-screen-lg px-8 py-12`;

const Title = tw.h2`text-2xl text-slate-600`;

const List = tw.div`mt-8`;

const Foot = tw.div`mt-8 flex justify-center`;

export type ArticlesProps = {
  milestone: number;
};

function useArticlesQuery() {
  const { labels, page } = useQuery();

  return useMemo(
    () => ({
      labels: labels ?? undefined,
      page: parseInt(page ?? '1', 10),
      pageSize: parseInt(import.meta.env.VITE_ARTICLE_PAGE_SIZE, 10),
    }),
    [labels, page],
  );
}

export default function Articles(props: ArticlesProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useArticlesQuery();

  const [category, setCategory] = useState<CategoryModel>();
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const total = category?.articles ?? 0;

  const [loadingArticles, loadArticles] = useHandling(
    useCallback(async () => {
      if (category?.number !== props.milestone) {
        const milestones = await github.listMilestones();
        const milestone = milestones.find((m) => m.number === props.milestone);

        if (!milestone) {
          navigate('/404');
          return;
        }

        setCategory(CategoryModel.from(milestone));
      }

      const list = await github.listIssues({
        milestone: props.milestone,
        ...query,
      });

      setArticles(list.map(ArticleModel.from));
    }, [props.milestone, query]),
  );

  useEffect(() => {
    loadArticles();
  }, [props.milestone, query]);

  const title = useMemo(() => {
    return category ? t(`tab.${category.title.toLowerCase()}` as any) : '';
  }, [category]);

  const location = useLocation();
  const getArticleLink = useCallback((id: number) => `${location.pathname}/${id}`, [location]);

  const getLabelLink = useCallback((labels: string) => {
    return createQueryURL({ labels, page: 1 });
  }, []);

  const onPageChange = useCallback(
    (page: number) => {
      navigate(createQueryURL({ page, labels: query.labels }));
    },
    [query.labels, props.milestone],
  );

  return (
    <Wrapper>
      <Skeleton tw="h-8 w-24">
        <Title>{title}</Title>
      </Skeleton>

      <List>
        {loadingArticles
          ? Array.from({ length: 8 }).map((_, i) => <ArticleSkeleton key={i} />)
          : articles.map((article) => (
              <ArticleItem
                key={article.id}
                article={article}
                getLink={getArticleLink}
                getLabelLink={getLabelLink}
              />
            ))}
      </List>

      <Foot>
        <Pagination
          page={query.page}
          pageSize={query.pageSize}
          total={total}
          onChange={onPageChange}
        />
      </Foot>
    </Wrapper>
  );
}
