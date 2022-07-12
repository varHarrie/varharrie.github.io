import mdDark from 'github-markdown-css/github-markdown-dark.css?raw';
import mdLight from 'github-markdown-css/github-markdown-light.css?raw';
import { changeLanguage } from 'i18next';
import prismLight from 'prism-themes/themes/prism-vs.css?raw';
import prismDark from 'prism-themes/themes/prism-vsc-dark-plus.css?raw';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

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
import { loadThemeStyles } from './utils';

const title = import.meta.env.VITE_TITLE;
const email = import.meta.env.VITE_EMAIL;
const githubUrl = import.meta.env.VITE_GITHUB_URL;

const Wrapper = styled.div`
  ${tw`relative pt-20 pb-16 min-h-screen flex flex-col`}
  background-image: radial-gradient(
    rgba(59, 130, 246, 0.3) 1px,
    rgba(59, 130, 246, 0) 0px
  );
  background-size: 32px 32px;
`;

const Header = tw.header`fixed top-0 z-10 h-20 w-full bg-gray-100 bg-opacity-50 backdrop-blur-sm saturate-100`;

const HeaderCenter = tw.div`mx-auto max-w-screen-lg flex px-8 items-center h-full text-gray-400`;

const Title = tw.span`mx-0.5 text-blue-500 font-semibold`;

const Nav = tw.nav`grid gap-3 lg:gap-6 grid-flow-col ml-auto leading-5`;

const navItemStyle = tw`opacity-60 cursor-pointer hover:(opacity-100 text-blue-500)`;

const NavItem = styled.a`
  ${navItemStyle}
`;

const NavLinkItem = styled(NavLink)`
  ${navItemStyle}

  &.active {
    ${tw`opacity-100 text-blue-500`}
  }
`;

const Divider = tw.div`w-[1px] h-full bg-gray-200`;

const Footer = tw.footer`
  absolute bottom-4 left-0 
  space-x-2 w-full
  text-sm text-center text-gray-300
  select-none
`;

const FooterCenter = tw.div`mx-auto max-w-screen-lg`;

export default function App() {
  const { t } = useTranslation();

  const [darkModeEnabled, setDarkModelEnabled] = useDarkMode();

  useEffect(() => {
    loadThemeStyles('prism-theme', darkModeEnabled ? prismDark : prismLight);
    loadThemeStyles('markdown-theme', darkModeEnabled ? mdDark : mdLight);
  }, [darkModeEnabled]);

  const onToggleDarkMode = useCallback(() => {
    setDarkModelEnabled(!darkModeEnabled);
  }, [darkModeEnabled]);

  const onToggleLanguage = useCallback(() => {
    changeLanguage(i18n.language === 'cn' ? 'en' : 'cn');
  }, []);

  return (
    <Wrapper>
      <Header>
        <HeaderCenter>
          <a href="/" tw="text-lg">
            <span>{'{'}</span>
            <Title>{title}</Title>
            <span>{'}'}</span>
          </a>

          <Nav>
            <NavLinkItem to="/posts">
              <IconPosts tw="inline lg:hidden" />
              <span tw="hidden lg:inline">{t('tab.posts')}</span>
            </NavLinkItem>
            <NavLinkItem to="/snippets">
              <IconSnippets tw="inline lg:hidden" />
              <span tw="hidden lg:inline">{t('tab.snippets')}</span>
            </NavLinkItem>
            <NavLinkItem to="/projects">
              <IconProjects tw="inline lg:hidden" />
              <span tw="hidden lg:inline">{t('tab.projects')}</span>
            </NavLinkItem>

            <Divider />

            <NavItem href={`mailto:${email}`}>
              <IconEmail />
            </NavItem>
            <NavItem href={githubUrl} target="_blank">
              <IconGithub />
            </NavItem>
            <NavItem onClick={onToggleLanguage}>
              <IconLanguage />
            </NavItem>
            <NavItem tw="hidden" onClick={onToggleDarkMode}>
              {darkModeEnabled ? <IconLight /> : <IconDark />}
            </NavItem>
          </Nav>
        </HeaderCenter>
      </Header>

      <Outlet />

      <Footer>
        <FooterCenter>
          <a
            tw="hover:text-blue-500"
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          >
            CC BY-NC-SA 4.0
          </a>
          <span tw="ml-2">2016-present © varHarrie</span>
        </FooterCenter>
      </Footer>
    </Wrapper>
  );
}
