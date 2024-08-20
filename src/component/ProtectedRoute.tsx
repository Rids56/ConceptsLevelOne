import { Navigate, Outlet } from 'react-router-dom';

type Props = {
    isAuthenticated: boolean,
}

export const ProtectedRoute = (props: Props) => {
    if (!props?.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}