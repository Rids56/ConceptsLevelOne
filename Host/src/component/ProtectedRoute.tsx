import { Navigate, Outlet } from 'react-router-dom';

type Props = {
    isAuthenticated: boolean,
}

export const ProtectedRoute = (props: Props) => {
    const validUser = props?.isAuthenticated || !!(sessionStorage.getItem('token'));    
    if (!validUser) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}