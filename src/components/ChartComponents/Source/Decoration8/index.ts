import { dynamic } from 'umi';

export default dynamic({
  loader: async function () {
    const defaultConfig = await import(
      /* webpackChunkName: "DECORATION_8" */ './defaultConfig'
    );
    const themeConfig = defaultConfig.themeConfig;
    const configComponent = await import(
      /* webpackChunkName: "DECORATION_8" */ './config'
    );
    const render = await import(
      /* webpackChunkName: "DECORATION_8" */ './component'
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
