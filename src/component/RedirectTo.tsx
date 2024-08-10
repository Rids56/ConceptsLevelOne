import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Register from './Register';
import SignIn from './SignIn';

export const RedirectTo = [
    {
        path: '/',
        element: <SignIn />
    },
    {
        path: '/dashboard',
        element: <Home />,        
    },
    {
        path: '/register',
        element: <Register />,        
    },
    {
        path: '/forgotPass',
        element: <ForgotPassword />,        
    },
];