import { Outlet } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

const RootLayout = () => {

  return (
    <ProtectedRoute >
      <Outlet />
    </ProtectedRoute>
  )
}
export default RootLayout;