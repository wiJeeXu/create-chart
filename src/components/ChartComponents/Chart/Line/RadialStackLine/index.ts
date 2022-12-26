import { dynamic } from 'umi';

export default dynamic({
  loader: async function () {
    const defaultConfig = await import(
      /* webpackChunkName: "RADIAL_STACK_LINE" */ './defaultConfig'
    );
    const themeConfig = defaultConfig.themeConfig;
    const configComponent = await import(
      /* webpackChunkName: "RADIAL_STACK_LINE" */ './config'
    );
    const render = await import(
      /* webpackChunkName: "RADIAL_STACK_LINE" */ './component'
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
