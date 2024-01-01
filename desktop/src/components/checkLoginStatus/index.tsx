import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState, Dispatch } from '@/src/models/store';
import { Loading } from '@/src/components/loading';

// eslint-disable-next-line react/display-name
export const checkLoginStatus = (Page: React.FunctionComponent) => () => {

  const dispatch = useDispatch<Dispatch>();

  const { userInfo, isLoading } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    dispatch.user.getUserInfo();
  }, []);

  if(isLoading){
    return <Loading />;
  }

  if(!userInfo?.id){
    return <Navigate to="/login" />;
  }

  return <Page />;
};
