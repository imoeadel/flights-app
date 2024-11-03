/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DatePicker, Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ReactComponent as CloseIcon } from '../../../assets/close.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete.svg';
import { ReactComponent as UploadImage } from '../../../assets/upload.svg';
import { useCheckAvailability, useCreateFlight, useEditFlight, useGetFlightPhoto } from '../../../services/useFlights';
import InputText from '../../lib/InputText';

const schema = yup.object().shape({
  code: yup.string().min(6).max(6).required().matches(/^\S*$/, "The code cannot contain spaces"),
  capacity: yup.number().typeError("Capacity must be a number between 1 and 200").required("Capacity is required").min(1).max(200),
  departureDate: yup.date().required("Departure Date is required")
});

const AddOrEditFlights = ({ handleCloseModal, setPage, isAddModalOpen, type, flightToEdit }) => {

  const [selectedDate, setSelectedDate] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isImageVisible, setIsImageVisible] = useState(false);



  const { register, handleSubmit, setValue, reset, setError, watch, formState: { errors } } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      departureDate: selectedDate || null,
    }
  });
  const { mutate: createFlight, isSuccess: isAddSuccess } = useCreateFlight()
  const { mutate: editFlight, isSuccess: isEditSuccess } = useEditFlight()
  const { refetch: checkAvailability, data: availability, isError } = useCheckAvailability(watch('code'));
  const { data: imageBlob } = useGetFlightPhoto(flightToEdit?.img && flightToEdit?.id);

  //! *********************************************** handle form submit ***********************************************

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("capacity", data.capacity);
    formData.append("departureDate", dayjs(selectedDate).startOf('day').format("YYYY-MM-DD"));

    if (selectedImage instanceof File) {
      formData.append("photo", selectedImage);
    } else if (imageBlob && !selectedImage && type === 'edit') {
      const existingImageFile = new File([imageBlob], "existing_photo.jpg", { type: imageBlob.type });
      formData.append("photo", existingImageFile);
    }

    if (type === 'edit') {
      editFlight({ formData, id: flightToEdit?.id });
    } else {
      createFlight(formData);
    }
  };

  //! *********************************************** check code availability ***********************************************
  useEffect(() => {
    if (watch('code').length === 6) {
      checkAvailability(watch('code'));
    }
  }, [watch('code')])

  useEffect(() => {
    if (availability?.status === 'unavailable' && type === 'add') {
      setError('code', {
        type: 'manual',
        message: 'Code is already taken',
      });
    }
  }, [availability])

  useEffect(() => {
    if (selectedDate) {
      setValue('departureDate', selectedDate, { shouldValidate: true });
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (isAddSuccess || isEditSuccess) {
      handleCloseModal();
      setPage(1)
      reset();
      setPreviewImage(null);
    }
  }, [handleCloseModal, isAddSuccess, isEditSuccess, reset, setPage])

  //! *********************************************** set initial values for edit ***********************************************

  useEffect(() => {
    if (type === 'edit' && flightToEdit) {
      setValue('code', flightToEdit?.code);
      setValue('capacity', flightToEdit?.capacity);
      const initialDate = dayjs(flightToEdit?.departureDate);
      setSelectedDate(initialDate);
      setValue('departureDate', initialDate, { shouldValidate: true });
    }
  }, [type, flightToEdit, setValue]);

  //! *********************************************** handle image upload ***********************************************

  const handleDeleteImage = async () => {
    setIsImageVisible(false);
    setSelectedImage(null);
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    setIsImageVisible(true);
  };

  useEffect(() => {
    if (imageBlob) {
      const imageUrl = URL.createObjectURL(imageBlob);
      setPreviewImage(imageUrl);
      setIsImageVisible(true);

      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [imageBlob]);

  return (
    <Modal
      open={isAddModalOpen}
      onCancel={handleCloseModal}
      className='2xl:!w-[550px] lg:!w-[480px] xs:!w-[350px]'
      closable={false}
      footer={null}
      centered
    >
      <div className='flex justify-between items-center mb-4'>
        <span className='font-medium 2xl:text-lg text-base'>{type === 'add' ? "Add Flight" : "Edit Flight"}</span>
        <button onClick={handleCloseModal} >
          <CloseIcon className='w-8 h-8' />
        </button>
      </div>
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
        {(watch('code')?.length === 6 && availability && availability?.status === 'available' && !isError) && (
          <span className="text-green-500 text-sm -mt-2 mb-2">
            Code is available
          </span>
        )}
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

        <DatePicker
          id='departureDate'
          value={selectedDate}
          onChange={(date, dateString) => {
            setSelectedDate(date)
          }}
          format="YYYY-MM-DD"
          className="[&>div>input]:cursor-pointer shadow-none rounded-md 2xl:h-[50px] h-[40px] 2xl:text-sm text-xs 2xl:[&>div>input]:!text-[13px] [&>div>input]:!text-[12px] border border-[#2FB3E3]"
        />
        {errors.departureDate && <p className="text-red-500 text-xs mt-1">{errors.departureDate.message}</p>}
        <label className='block text-[#000] font-medium 2xl:text-base text-sm 2xl:my-2 my-1'>Upload Image</label>
        <div className='w-full border-dashed border-primaryColor h-[100px] flex flex-col rounded-md justify-center items-center gap-2 relative border'>
          {isImageVisible ? (
            <div className='flex items-center justify-start gap-2 w-full p-2 overflow-hidden'>
              <img src={previewImage} alt="preview" className='w-[80px] h-[80px] rounded-md object-cover' />
              <DeleteIcon
                className='w-[20px] h-[17px] cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteImage()

                }} />
            </div>
          ) : (
            <>
              <div className='flex items-center gap-1'>
                <UploadImage
                  width="30px"
                  height="30px"
                />
                <span style={{ fontSize: '15px', color: '#A9A9A9' }}>
                  Upload Image Here
                </span>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept=".jpg, .jpeg, .png, .gif, .svg, .webp, .bmp, .tiff, .jfif"
                  className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                />
              </div>
            </>
          )}
        </div>
        <Button type="primary" htmlType="submit" className='bg-primaryColor w-[80px] mt-3 ml-auto 2xl:h-10 h-8'>
          {type === 'add' ? "Add Flight" : "Edit Flight"}
        </Button>

      </form>
    </Modal>
  );
};

export default AddOrEditFlights;
