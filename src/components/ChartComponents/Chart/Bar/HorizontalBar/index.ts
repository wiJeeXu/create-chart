import { dynamic } from 'umi';

export default dynamic({
  loader: async function () {
    const defaultConfig = await import(
      /* webpackChunkName: "HORIZONTAL_BAR" */ './defaultConfig'
    );
    const themeConfig = defaultConfig.themeConfig;
    const configComponent = await import(
      /* webpackChunkName: "HORIZONTAL_BAR" */ './config'
    );
    const render = await import(
      /* webpackChunkName: "HORIZONTAL_BAR" */ './component'
    );
    const type = render.default.id;
    return {
      defaultConfig,
      themeConfig,
      configComponent,
      render,
      type,
    };
  },
});
