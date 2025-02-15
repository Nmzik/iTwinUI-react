/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgStar from '@itwin/itwinui-icons-react/cjs/icons/Star';
import { Meta, Story } from '@storybook/react/';
import React from 'react';
import {
  VerticalTabs,
  HorizontalTabs,
  HorizontalTabsProps,
  VerticalTabsProps,
  Tab,
} from '../../src/core';
import { Tabs, TabsProps } from '../../src/core/Tabs/Tabs';

export default {
  title: 'Core/Tabs',
  component: Tabs,
  subcomponents: { Tab },
  args: {
    focusActivationMode: 'auto',
    color: 'blue',
  },
  argTypes: {
    children: { control: { disable: true } },
    style: { control: { disable: true } },
    orientation: { table: { disable: true } },
  },
} as Meta<TabsProps>;

export const DefaultTabs: Story<Partial<HorizontalTabsProps>> = (args) => {
  const [index, setIndex] = React.useState(0);
  const getContent = () => {
    switch (index) {
      case 0:
        return "Bentley Systems, Incorporated, is an American-based software development company that develops, manufactures, licenses, sells and supports computer software and services for the design, construction, and operation of infrastructure. The company's software serves the building, plant, civil, and geospatial markets in the areas of architecture, engineering, construction (AEC) and operations. Their software products are used to design, engineer, build, and operate large constructed assets such as roadways, railways, bridges, buildings, industrial plants, power plants, and utility networks. The company re-invests 20% of their revenues in research and development.";
      case 1:
        return 'Bentley Systems is headquartered in Exton, Pennsylvania, United States, but has development, sales and other departments in over 50 countries. The company had revenues of $700 million in 2018.';
      default:
        return 'Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984. They introduced the commercial version of PseudoStation in 1985, which allowed users of Intergraphs VAX systems to use low-cost graphics terminals to view and modify the designs on their Intergraph IGDS (Interactive Graphics Design System) installations. Their first product was shown to potential users who were polled as to what they would be willing to pay for it. They averaged the answers, arriving at a price of $7,943. A DOS-based version of MicroStation was introduced in 1986.';
    }
  };
  return (
    <HorizontalTabs
      labels={[
        <Tab key={1} label='Item1' />,
        <Tab key={2} label='Item2' />,
        <Tab key={3} label='Item3' />,
      ]}
      {...args}
      onTabSelected={setIndex}
    >
      {getContent()}
    </HorizontalTabs>
  );
};
DefaultTabs.args = {
  type: 'default',
  labels: [
    <Tab key={1} label='Item1' />,
    <Tab key={2} label='Item2' />,
    <Tab key={3} label='Item3' />,
  ],
};

export const BorderlessTabs = DefaultTabs.bind({});
BorderlessTabs.args = {
  labels: [
    <Tab key={1} label='Item1' />,
    <Tab key={2} label='Item2' />,
    <Tab key={3} label='Item3' />,
  ],
  type: 'borderless',
};

export const PillTabs = DefaultTabs.bind({});
PillTabs.args = {
  labels: Array(3)
    .fill(null)
    .map((_, index) => <Tab key={index} startIcon={<SvgStar />} />),
  type: 'pill',
};

export const SublabelsAndIcons = DefaultTabs.bind({});
SublabelsAndIcons.args = {
  labels: Array(3)
    .fill(null)
    .map((_, index) => (
      <Tab
        key={index}
        label={`Item${index}`}
        sublabel={`Sublabel ${index}`}
        startIcon={<SvgStar />}
        disabled={index === 2}
      />
    )),
  type: 'borderless',
};

export const Vertical: Story<Partial<VerticalTabsProps>> = (args) => {
  const [index, setIndex] = React.useState(0);
  const getContent = () => {
    switch (index) {
      case 0:
        return "Bentley Systems, Incorporated, is an American-based software development company that develops, manufactures, licenses, sells and supports computer software and services for the design, construction, and operation of infrastructure. The company's software serves the building, plant, civil, and geospatial markets in the areas of architecture, engineering, construction (AEC) and operations. Their software products are used to design, engineer, build, and operate large constructed assets such as roadways, railways, bridges, buildings, industrial plants, power plants, and utility networks. The company re-invests 20% of their revenues in research and development.";
      case 1:
        return 'Bentley Systems is headquartered in Exton, Pennsylvania, United States, but has development, sales and other departments in over 50 countries. The company had revenues of $700 million in 2018.';
      default:
        return 'Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984. They introduced the commercial version of PseudoStation in 1985, which allowed users of Intergraphs VAX systems to use low-cost graphics terminals to view and modify the designs on their Intergraph IGDS (Interactive Graphics Design System) installations. Their first product was shown to potential users who were polled as to what they would be willing to pay for it. They averaged the answers, arriving at a price of $7,943. A DOS-based version of MicroStation was introduced in 1986.';
    }
  };
  return (
    <VerticalTabs
      type='borderless'
      labels={Array(3)
        .fill(null)
        .map((_, index) => (
          <Tab
            key={index}
            label={`Item${index}`}
            sublabel={`Sublabel ${index}`}
            startIcon={<SvgStar />}
          />
        ))}
      {...args}
      onTabSelected={setIndex}
    >
      {getContent()}
    </VerticalTabs>
  );
};
Vertical.args = {
  labels: Array(3)
    .fill(null)
    .map((_, index) => (
      <Tab
        key={index}
        label={`Item${index}`}
        sublabel={`Sublabel ${index}`}
        startIcon={<SvgStar />}
      />
    )),
  type: 'borderless',
};
Vertical.argTypes = { type: { options: ['default', 'borderless'] } };
