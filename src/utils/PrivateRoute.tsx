import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { IAuth } from '../types';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { isAuthorized, loading } = useSelector((state: any) => state.authSlice.isAuthorized);
  return (
    <Route
      {...rest}
      render={(props: any) =>
        loading ? (
          <div>loading...</div>
        ) : isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
