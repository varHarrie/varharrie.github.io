import { changeLanguage } from 'i18next';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import IconPosts from '~icons/ri/article-line';
import IconProjects from '~icons/ri/function-line';
import IconGithub from '~icons/ri/github-line';
import IconLanguage from '~icons/ri/global-line';
import IconEmail from '~icons/ri/mail-line';
import IconDark from '~icons/ri/moon-line';
import IconSnippets from '~icons/ri/sticky-note-line';
import IconLight from '~icons/ri/sun-line';

import useDarkMode from './hooks/use-dark-mode';
import i18n from './i18n';

const title = import.meta.env.VITE_TITLE;
const email = import.meta.env.VITE_EMAIL;
const githubUrl = import.meta.env.VITE_GITHUB_URL;

const Wrapper = tw.div`relative mx-auto pb-16 max-w-screen-lg min-h-screen`;

const Header = tw.header`
  sticky top-0 z-10
  flex px-8 h-20 align-items[center]
  text-gray-400 bg-opacity-80 bg-gray-50 backdrop-blur-sm saturate-150
`;

const Title = tw.span`mx-0.5 text-blue-500`;

const Nav = tw.nav`grid gap-3 lg:gap-6 grid-flow-col ml-auto leading-5`;

const NavItem = tw.a`opacity-60 cursor-pointer hover:opacity-100 hover:text-blue-500`;

const Footer = tw.footer`
  absolute bottom-4 left-0 
  space-x-2 w-full
  text-sm text-center text-gray-300
  select-none
`;

export default function App() {
  const { t } = useTranslation();

  const [darkModeEnabled, setDarkModelEnabled] = useDarkMode();

  const onToggleDarkMode = useCallback(() => {
    setDarkModelEnabled(!darkModeEnabled);
  }, [darkModeEnabled]);

  const onToggleLanguage = useCallback(() => {
    changeLanguage(i18n.language === 'cn' ? 'en' : 'cn');
  }, []);

  return (
    <Wrapper>
      <Header>
        <a href="/" tw="text-lg">
          <span>{'{'}</span>
          <Title>{title}</Title>
          <span>{'}'}</span>
        </a>

        <Nav>
          <NavItem>
            <IconPosts tw="inline lg:hidden" />
            <span tw="hidden lg:inline">{t('tab.posts')}</span>
            <IconSnippets tw="inline lg:hidden" />
            <span tw="hidden lg:inline">{t('tab.snippets')}</span>
            <IconProjects tw="inline lg:hidden" />
            <span tw="hidden lg:inline">{t('tab.projects')}</span>

          <NavItem href={`mailto:${email}`}>
            <IconEmail />
          </NavItem>
          <NavItem href={githubUrl} target="_blank">
            <IconGithub />
          </NavItem>
          <NavItem onClick={onToggleLanguage}>
            <IconLanguage />
          </NavItem>
          <NavItem onClick={onToggleDarkMode}>
            {darkModeEnabled ? <IconLight /> : <IconDark />}
          </NavItem>
        </Nav>
      </Header>

      <Footer>
        <a
          tw="hover:text-blue-500"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          CC BY-NC-SA 4.0
        </a>
        <span tw="ml-2">2016-present © varHarrie</span>
      </Footer>
    </Wrapper>
  );
}
