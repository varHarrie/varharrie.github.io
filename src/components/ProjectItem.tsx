import React from 'react';
import tw, { styled } from 'twin.macro';
import IconIssue from '~icons/octicon/issue-opened-16';
import IconForked from '~icons/octicon/repo-forked-16';
import IconStar from '~icons/octicon/star-16';
import IconDefault from '~icons/ri/code-s-slash-line';
import IconCss from '~icons/ri/css3-line';
import IconHtml from '~icons/ri/html5-line';
import IconVue from '~icons/ri/vuejs-line';
import IconJs from '~icons/teenyicons/javascript-outline';
import IconTs from '~icons/teenyicons/typescript-outline';
import IconCS from '~icons/vscode-icons/file-type-csharp';

import ProjectModel from '../models/ProjectModel';

const Wrapper = tw.div`
  relative p-3 pl-14
  bg-white dark:bg-gray-900 rounded-md ring-1 ring-slate-600/5 shadow-sm hover:shadow-lg
  transition-all duration-300
`;

const Icon = styled.div`
  ${tw`
    absolute top-3 left-3 w-9 h-9 rounded-md
    flex items-center justify-center overflow-hidden font-bold
  `}

  &::before {
    ${tw`absolute top-0 left-0 block [content:''] w-full h-full opacity-20`}
    background-color: currentColor;
  }
`;

const Title = tw.a`block text-blue-500 truncate`;

const Description = styled.div`
  ${tw`mt-2 text-slate-400 text-sm overflow-hidden`}

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CountList = tw.ul`mt-2 space-x-3 flex min-w-0 text-sm text-slate-400 leading-5`;

const CountItem = tw.li`flex items-center`;

type IconDetail = {
  component: React.FunctionComponent;
  color: string;
};

const iconMap: Record<string, IconDetail> = {
  default: { component: IconDefault, color: '' },
  TypeScript: { component: IconTs, color: '#3178C6' },
  JavaScript: { component: IconJs, color: '#FCD002' },
  HTML: { component: IconHtml, color: '#FF3C41' },
  CSS: { component: IconCss, color: '#10BDFF' },
  Vue: { component: IconVue, color: '#41B883' },
  'C#': { component: IconCS, color: '#368833' },
};

export type ProjectItemProps = {
  project: ProjectModel;
};

export default function ProjectItem(props: ProjectItemProps) {
  const { project } = props;

  const icon = iconMap[props.project.language] ?? iconMap.default;

  return (
    <Wrapper>
      <Icon style={{ color: icon.color }}>
        <icon.component />
      </Icon>
      <Title href={project.htmlUrl}>{project.fullName}</Title>
      <Description>{project.description}</Description>
      <CountList>
        <CountItem>
          <IconStar />
          <span tw="ml-2">{project.stargazersCount}</span>
        </CountItem>
        <CountItem>
          <IconForked />
          <span tw="ml-2">{project.forksCount}</span>
        </CountItem>
        <CountItem>
          <IconIssue />
          <span tw="ml-2">{project.openIssuesCount}</span>
        </CountItem>
      </CountList>
    </Wrapper>
  );
}
