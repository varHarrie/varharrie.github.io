import React from 'react';
import { Link, To } from 'react-router-dom';
import tw from 'twin.macro';

import LabelModel from '../models/LabelModel';

const Wrapper = tw(Link)`mr-4 flex items-center`;

const Dot = tw.span`w-2 h-2 rounded-full`;

const Title = tw.span`ml-2 dark:text-slate-600`;

export type LabelItemProps = {
  label: LabelModel;
  getLink: (label: string) => To;
};

export default function LabelItem(props: LabelItemProps) {
  const { label, getLink } = props;

  return (
    <Wrapper to={getLink(label.name)}>
      <Dot style={{ background: label.color }} />
      <Title>{label.name}</Title>
    </Wrapper>
  );
}
