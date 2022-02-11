import React, {useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { loginSuccess } from '../redux/slices/auth';

export default function Dashboard():JSX.Element {
const isLogged = useAppSelector(state => state.authSlice.isAuthorized)
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (document.cookie.includes('testUser')) {
      const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)testUser\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      dispatch(loginSuccess(JSON.parse(cookieValue)))
      return
    }
    if (!document.cookie.includes('testUser=') || !isLogged){
      history.push('/login')
    }
  },[])

  return (
    <div>{`You are logged in – everything Is fine!`}</div>
  )
}
