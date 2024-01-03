import { useDispatch, useSelector } from 'react-redux';
import { RootState, Dispatch } from '@/src/models/store';

export const useAppStore = () => {
  const dispatch = useDispatch<Dispatch>();

  const { apps, isLoading } = useSelector((state: RootState) => state.app);

  return {
    apps,
    isLoading,
    appDispatch: dispatch.app,
  };
};
