import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Footer from "./footer"

export default {
  title: "Components/Footer",
  component: Footer,
} as ComponentMeta<typeof Footer>;

export const Template: ComponentStory<typeof Footer> = () => <Footer />;

export const Display = Template.bind({});
