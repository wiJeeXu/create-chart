import { ConnectState } from '@/models/connect';

export const mapStateToProps = (state: ConnectState) => {
  return {
    select: state.global.select || [],
    screenType: state.global.screenType,
    hoverSelect: state.global.hoverSelect || '',
  };
};

export const mapDispatchToProps = (dispatch: any) => ({});
