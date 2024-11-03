import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import WrapperLayout from "./Layouts/WrapperLayout";
import { useLogout } from "./services/useAuth";


function ProtectedRoute({ children }) {


  let userInfo = JSON.parse(localStorage.getItem("flightsUserInfo"));

  const { mutate: logout } = useLogout()

  useEffect(() => {
    if (!userInfo) {
      logout()
    }
  }, [logout, userInfo]);

  if (!userInfo) {
    <Navigate to="/login" />;
  }

  return (
    <WrapperLayout>
      {children}
    </WrapperLayout>
  )
}

export default React.memo(ProtectedRoute)