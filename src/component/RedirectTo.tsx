import ForgotPassword from './ForgotPassword';
import Register from './Register';
import SignIn from './SignIn';
import { Dashboard } from './index';
import { UserList } from './Masters/User/UserList';
import CountryList from './Masters/Country/CountryList';
import { CityList } from './Masters/City.tsx/CityList';
import { StateList } from './Masters/State/StateList';
import { Home } from './Home';
import { ProtectedRoute } from './ProtectedRoute';

const getAccessToken = () => {
    return sessionStorage.getItem('token');
}

const isAuthenticated = () => {
    return !!getAccessToken();
}

export const RedirectTo = [
    {
        path: '/',
        element: <SignIn />
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/forgotPass',
        element: <ForgotPassword />,
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
        children: [
            {
                path: '', //default route
                element: <Home />,
                children: [
                    { path: '', element: <Dashboard /> },
                    { path: 'users', element: <UserList /> }, // without leading slashes, making them relative to /dashboard
                    { path: 'countries', element: <CountryList /> },
                    { path: 'states', element: <StateList /> },
                    { path: 'cities', element: <CityList /> },
                ]
            },
        ],
    },

];