import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Register from './Register';
import SignIn from './SignIn';
import { Dashboard } from '.';
import { UserList } from './Masters/User/UserList';
import { CountryList } from './Masters/Country/CountryList';
import { CityList } from './Masters/City.tsx/CityList';
import { StateList } from './Masters/State/StateList';

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
        element: <Home />,
        children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/dashboard/users', element: <UserList /> },
            { path: '/dashboard/countries', element: <CountryList /> },
            { path: '/dashboard/states', element: <StateList /> },
            { path: '/dashboard/cities', element: <CityList /> },
        ],
    },

];