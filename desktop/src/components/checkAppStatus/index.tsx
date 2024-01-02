import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState, Dispatch } from '@/src/models/store';
import { Loading } from '@/src/components/loading';

// eslint-disable-next-line react/display-name
export const checkAppStatus = (Page: React.FunctionComponent) => () => {

  const dispatch = useDispatch<Dispatch>();

  const location = useLocation();

  const { userInfo, isLoading } = useSelector((state: RootState) => state.user);

  const { apps, isLoading: appLoading } = useSelector((state: RootState) => state.app);

  React.useEffect(() => {
    dispatch.user.getUserInfo();
  }, []);

  React.useEffect(() => {
    if(userInfo.id){
      dispatch.app.getAppList();
    }
  }, [userInfo.id]);

  if(isLoading){
    return <Loading />;
  }

  if(!userInfo?.id){
    return <Navigate to="/login" />;
  }

  if(!appLoading && apps.length === 0 && location.pathname !== '/'){
    return <Navigate to="/" />;
  }

  return <Page />;
};
