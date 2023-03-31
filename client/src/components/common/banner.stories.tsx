import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Banner from "./banner"

export default {
  title: "Components/Banner",
  component: Banner,
} as ComponentMeta<typeof Banner>;

export const Template: ComponentStory<typeof Banner> = () => <Banner />;

export const Display = Template.bind({});
