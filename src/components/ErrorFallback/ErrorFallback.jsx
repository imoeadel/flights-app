import { useNavigate } from "react-router-dom";

let errorMessage = 'Something went wrong 🧐';

const ErrorFallback = () => {

  const navigate = useNavigate();


  return (
    <div className='h-screen bg-[#eee] flex items-center justify-center p-[4.8rem]'>
      <div className='bg-[#ddd] border rounded-lg p-[4.8rem] text-center flex-[0_1_96rem] flex flex-col items-center gap-4'>
        <p className="font-semibold text-xl">{errorMessage}</p>
        <button onClick={() => navigate('/')} className="bg-secondaryColor text-white rounded-md py-2 px-4 w-fit">
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback