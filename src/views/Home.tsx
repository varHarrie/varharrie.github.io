import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import IconArrowRight from '~icons/ri/arrow-right-line';

import ShapeEffect from '../components/ShapeEffect/ShapeEffect';

const Background = tw.div`absolute [z-index:0] top-0 left-0 w-full h-full [user-select:none] pointer-events-none opacity-50 blur-sm`;

const Foreground = tw.div`absolute [z-index:2] top-0 left-0 w-full h-full [user-select:none] pointer-events-none`;

const Wrapper = tw.main`px-8 py-20 w-full flex-1 flex flex-col justify-center`;

const Center = tw.div`relative [z-index:1] mx-auto max-w-screen-lg text-center`;

const Title = tw.h2`text-5xl text-slate-600 font-bold leading-10`;

const Description = tw.p`mt-6 text-3xl text-slate-400`;

const LinkButton = tw.button`
  mt-12 py-3 px-6 inline-flex items-center
  bg-blue-500 active:bg-blue-600 text-blue-50 text-center
  gap-4 hover:gap-8
  rounded-full outline-none transition-all
`;

export default function Home() {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Background>
        <ShapeEffect count={12} sizes={[30, 60]} />
      </Background>
      <Foreground>
        <ShapeEffect count={12} sizes={[40, 80]} />
      </Foreground>
      <Center>
        <Title>{t('intro.title')}</Title>
        <Description>{t('intro.description')}</Description>
        <Link to="/posts">
          <LinkButton>
            <span>{t('intro.link')}</span>
            <IconArrowRight />
          </LinkButton>
        </Link>
      </Center>
    </Wrapper>
  );
}
