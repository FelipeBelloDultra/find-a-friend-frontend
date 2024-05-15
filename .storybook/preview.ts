import i18n from "~/plugins/i18n";

import type { Preview } from "@storybook/react";

import "~/styles/global.css";

const preview: Preview = {
  parameters: {
    i18n,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
