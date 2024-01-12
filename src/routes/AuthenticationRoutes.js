import { lazy } from 'react';
import Loadable from './../ui-component/Loadable';
import MinimalLayout from './../layout/MinimalLayout';
import { Navigate } from 'react-router-dom';
import { staticToken } from 'config/firebase';

const Login = Loadable(lazy(() => import('views/authentication/login/index')));
const DirectToken = Loadable(lazy(() => import('views/authentication/login/DirectToken')));


const AuthenticationRoutes = (isLoggedIn) => ({
    path: '/',
    element: (!isLoggedIn || isLoggedIn === staticToken) ? <MinimalLayout /> : <Navigate to="/search" />,
    children: [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/direct-auth/:token',
            element: <DirectToken />
        },
    ]
});

export default AuthenticationRoutes;
