import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DatePicker, Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateFlight } from '../../../services/useFlights';
import InputText from '../../lib/InputText';

const schema = yup.object().shape({
  code: yup.string().min(6, 'Code must be at least 6 characters').required(),
  capacity: yup.number().positive('Capacity must be positive').required(),
  departureDate: yup.date().required('Departure Date is required'),
});

const EditFlight = ({ handleCloseModal, setPage, isAddModalOpen, flightToEdit }) => {
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { mutate: createFlight, isSuccess } = useCreateFlight()


  const onSubmit = (data) => {
    createFlight({ ...data, departureDate: dayjs(data.departureDate[0]).format('YYYY-MM-DD') });
  };

  const departureDate = watch('departureDate');

  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
      setPage(1)
      reset();
    }
  }, [isSuccess])

  useEffect(() => {
    
  }, [isAddModalOpen, flightToEdit])

  return (
    <Modal
      open={isAddModalOpen}
      onCancel={handleCloseModal}
      className='2xl:!w-[550px] !w-[480px] xs:!w-[350px]'
      closable={false}
      footer={null}
      centered
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
        <InputText
          type="text"
          label="Code"
          placeholder="Enter Code of 6 characters"
          name="code"
          register={register}
          errors={errors}
          inputStyle={`appearance-none border 2xl:h-[50px] h-[40px] text-black 2xl:text-sm text-xs rounded-md w-full py-3 px-3 font-normal outline-none border-[#2FB3E3]`}
          labelStyle={`block text-[#000] font-medium 2xl:text-base text-sm 2xl:mb-2 mb-1`}
        />
        <InputText
          type="number"
          label="Capacity"
          placeholder="Enter Capacity"
          name="capacity"
          register={register}
          errors={errors}
          inputStyle={`appearance-none border 2xl:h-[50px] h-[40px] text-black 2xl:text-sm text-xs rounded-md w-full py-3 px-3 font-normal outline-none border-[#2FB3E3]`}
          labelStyle={`block text-[#000] font-medium 2xl:text-base text-sm 2xl:mb-2 mb-1`}
        />
        <label htmlFor='departureDate' className={`block text-[#000] font-medium 2xl:text-base text-sm 2xl:mb-2 mb-1`}>Departure Date</label>

        {/* Use setValue to update departureDate */}
        <DatePicker
          id='departureDate'
          value={departureDate ? dayjs(departureDate) : null} // Show the selected date in DatePicker
          onChange={(date) => setValue('departureDate', date ? dayjs(date).toDate() : null)}
          format="YYYY-MM-DD"
          className="[&>div>input]:cursor-pointer shadow-none rounded-md 2xl:h-[50px] h-[40px] 2xl:text-sm text-xs 2xl:[&>div>input]:!text-[13px] [&>div>input]:!text-[12px] border border-[#2FB3E3]"
        />
        {errors.departureDate && <p className="text-red-500 text-xs mt-1">{errors.departureDate.message}</p>}
        <Button type="primary" htmlType="submit" className='bg-primaryColor w-[80px] mt-3 ml-auto 2xl:h-[50px] h-[40px]'>
          Add Flight
        </Button>
      </form>
    </Modal>
  );
};

export default EditFlight;
