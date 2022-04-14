import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import IconArrowRight from '~icons/ri/arrow-right-line';

const Wrapper = tw.main`px-8 py-20 text-center`;

const Title = tw.h2`text-4xl text-gray-600 font-bold leading-10`;

const Description = tw.p`mt-4 text-xl text-gray-400`;

const LinkButton = tw.button`
  mt-10 py-3 px-6 inline-flex items-center
  bg-blue-500 active:bg-blue-600 text-blue-50 text-center
  rounded-full outline-none transition-all
`;

export default function Home() {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Title>{t('intro.title')}</Title>
      <Description>{t('intro.description')}</Description>
      <Link to="/posts">
        <LinkButton>
          <span tw="mr-2 hover:mr-4 transition-all">{t('intro.link')}</span>
          <IconArrowRight />
        </LinkButton>
      </Link>
    </Wrapper>
  );
}
