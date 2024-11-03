/* eslint-disable react-hooks/exhaustive-deps */
import { Dropdown, Menu, Spin } from "antd";
import { Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileSample from "../assets/ProfileSample.svg";
import Logo from '../assets/logo.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout.svg';



const WrapperLayout = ({ children }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('flightsUserInfo'));

  const handleLogout = () => {
    localStorage.removeItem('flightsUserInfo');
    navigate('/login');
  };
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/flights', { replace: true });
    }
  }, [location, navigate]);

  const menu = (
    <Menu>
      <Menu.Item key="1" className="cursor-default">
        {user?.name}
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        <LogoutIcon className="mr-2 h-4" />
        Logout
      </Menu.Item>
    </Menu>
  );

  const shouldShowToolbar = !['/login', '/register'].includes(location.pathname);

  return (
    <div className="flex relative gap-x-1 w-full overflow-hidden">
      <Suspense
        fallback={
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold">
            <Spin tip="Loading..." size="small" >
              <div className='p-12 bg-[rgba(0,0,0,0.1)] rounded-md'></div>
            </Spin>
          </div>
        }>
        <div className="w-full h-[100vh] overflow-hidden">
          {shouldShowToolbar && (
            <div className=" flex justify-between items-center w-full p-4 bg-secondaryColor text-white mb-2 2xl:h-[70px] h-[60px]">
              <div className="flex items-center">
                <img src={Logo} loading="lazy" className='2xl:w-[80px] 2xl:h-[50px] w-[60px] h-[40px] cursor-pointer' alt="logo" onClick={() => navigate('/flights')} />
                <span className="font-semibold">FlyMe</span>
              </div>
              <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                <img
                  src={ProfileSample}
                  alt="Profile"
                  className="rounded-full cursor-pointer 2xl:w-[45px] 2xl:h-[45px] w-[35px] h-[35px] "
                />
              </Dropdown>
            </div>
          )}
          <div className="2xl:h-[calc(100vh-70px)] h-[calc(100vh-60px)]">
            {children}
          </div>
        </div>
      </Suspense>
    </div>
  )
}
export default WrapperLayout;