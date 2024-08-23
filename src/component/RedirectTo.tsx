import ForgotPassword from './ForgotPassword';
import Register from './Register';
import SignIn from './SignIn';
import { Dashboard } from './index';
import { UserList } from './Masters/User/UserList';
import CountryList from './Masters/Country/CountryList';
import { Home } from './Home';
import { ProtectedRoute } from './ProtectedRoute';
import UserAdd from './Masters/User/UserAdd';
import CountryAdd from './Masters/Country/CountryAdd';
import StateList from './Masters/State/StateList';
import StateAdd from './Masters/State/StateAdd';
import CityList from './Masters/City/CityList';
import CityAdd from './Masters/City/CityAdd';
import ClientList from './Masters/Client/ClientList';
import ClientListScroll from './Masters/ClientScroll/ClientListScroll';

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
                    { path: 'userUpdates', element: <UserAdd /> },
                    { path: 'clients', element: <ClientList /> },
                    { path: 'clientScroll', element: <ClientListScroll /> },
                    { path: 'countries', element: <CountryList /> },
                    { path: 'countryUpdates', element: <CountryAdd /> },
                    { path: 'states', element: <StateList /> },
                    { path: 'stateUpdates', element: <StateAdd /> },                    
                    { path: 'cities', element: <CityList /> },
                    { path: 'cityUpdates', element: <CityAdd /> },                    
                ]
            },
        ],
    },

];