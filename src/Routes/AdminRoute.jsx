// import React from 'react';

// const AdminRoute = () => {
//     return (
//         <div>

//         </div>
//     );
// };

// export default AdminRoute;


import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../Hooks/useAdmin";


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
console.log({loading, isAdminLoading});
    console.log(isAdmin.admin);

    if (loading || isAdminLoading) {
        return <div>
            loading...
            <span className="loading loading-infinity loading-xs"></span>
            <span className="loading loading-infinity loading-sm"></span>
            <span className="loading loading-infinity loading-md"></span>
            <span className="loading loading-infinity loading-lg"></span>

        </div>
    }

    if (user && isAdmin?.admin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;

