import { createModel } from '@rematch/core';
import type { RootModel } from '.';
import { getAppList } from '@/src/api';

const userModel = createModel<RootModel>()({
  state: {
    apps: [],
    isLoading: true,
  },
  reducers: {
    updateAppModel(state, newState){
      return {
        ...state,
        ...newState,
      };
    },
  },
  effects: (dispatch) => ({
    async getAppList() {
      dispatch.app.updateAppModel({
        isLoading: true,
      });
      const { code, data } = await getAppList();
      dispatch.app.updateAppModel({
        isLoading: false,
        apps: code === 1000 ? data : [],
      });
    },
  }),
});

export default userModel;
