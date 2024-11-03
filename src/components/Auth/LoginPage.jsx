import { LoadingOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Logo from '../../assets/logo.svg';
import { useLoginUser } from '../../services/useAuth';
import InputPassword from '../lib/InputPassword';
import InputText from '../lib/InputText';
import SplashLogo from './SplashLogo';

export const registerSchema = yup.object().shape({
  email: yup.string(),
  password: yup.string(),
});

const LoginPage = () => {
  const [showLogo, setShowLogo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLogo(true);
    }, 2200);
    return () => clearTimeout(timeout);
  }, []);

  const { register, handleSubmit } = useForm({
    mode: "all",
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const { mutate: loginUser, data: userData, isPending } = useLoginUser()

  useEffect(() => {
    if (userData) {
      navigate('/flights')
    }
  }, [userData, navigate])

  const onSubmit = (data) => {
    console.log('DATA: ', data)
    loginUser(data)
  };

  return (
    <div className='relative w-full h-screen flex items-center justify-center bg-[#18073B] bg-cover bg-center bg-authBG'>
      <div className='absolute w-screen bg-black z-0'></div>
      <SplashLogo />
      <div className={
        `z-10 opacity-0 transition-all duration-500 w-full mb-20
            ${showLogo ? "opacity-100" : ""}`
      }>
        <div className='flex flex-col items-center justify-center gap-y-2 mb-8'>
          <img src={Logo} loading="lazy" className='2xl:w-[120px] 2xl:h-[80px] w-[80px] h-[60px]' alt="fdfdfd" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm mx-auto flex flex-col gap-2'>
          <InputText
            type="text"
            label="Email"
            labelStyle='block text-white 2xl:font-medium font-normal 2xl:mb-2 mb-1'
            inputStyle='shadow appearance-none border rounded-[7px] w-full 2xl:py-3 py-2 px-3 text-black font-medium leading-tight focus:outline-none focus:shadow-outline'
            placeholder="Email"
            name="email"
            register={register}
          />
          <InputPassword
            label="Password"
            labelStyle='block text-white 2xl:font-medium font-normal 2xl:mb-2 mb-1'
            inputStyle='shadow appearance-none border rounded-[7px] w-full 2xl:py-3 py-2 px-3 text-black  font-medium leading-tight focus:outline-none focus:shadow-outline'
            name="password"
            register={register}
          />
          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-primaryColor hover:bg-[#167ca2] text-white font-medium 2xl:py-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {isPending ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} /> : 'LOGIN'}
          </button>
          <div className='flex gap-2 items-center justify-center'>
            <span className='block text-white 2xl:font-medium font-normal 2xl:mb-2 mb-1'>Don't have an account?</span>
            <button type='button' onClick={() => navigate('/register')} className='text-blue-400 2xl:font-medium font-normal 2xl:mb-2 mb-1'>Create an account</button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default LoginPage;
