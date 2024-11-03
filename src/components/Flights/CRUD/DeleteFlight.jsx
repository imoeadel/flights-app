import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Spin } from 'antd';
import React, { useEffect } from 'react';
import { ReactComponent as CloseIcon } from '../../../assets/close.svg';
import { ReactComponent as DeleteImage } from '../../../assets/delete_warning.svg';
import { useDeleteFlight } from '../../../services/useFlights';

const LabelButton = ({ type = 'button', label, styles, disabled = false, handleClick }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={
        `font-semibold py-2 px-6 rounded-full flex items-center justify-center
        ${disabled ? 'flex items-center justify-center min-w-[110px] 2xl:h-10 h-8 !bg-gray-400 text-white cursor-not-allowed' : styles} ${styles}
        `}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}

const DeleteFlight = ({
  itemToDelete,
  isDeleteModalOpen,
  handleCloseModal,
}) => {

  const { mutate: deleteFlight, isPending, isSuccess } = useDeleteFlight();

  const handleCancel = () => {
    handleCloseModal()
  };

  const handleDeleteFlight = () => {
    deleteFlight(itemToDelete)
  }

  useEffect(() => {
    if (isSuccess) {
      handleCancel()
    }
  }, [isSuccess])


  return (
    <Modal
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      className='2xl:!w-[550px] lg:!w-[480px] xs:!w-[350px]'
      closable={false}
      footer={null}
      centered
    >
      <div>
        {/* //? header  */}
        <div className='flex justify-between items-center mb-4'>
          <span className='font-medium 2xl:text-lg text-base'>Delete Flight </span>
          <button onClick={handleCancel} >
            <CloseIcon className='w-8 h-8' />
          </button>
        </div>
        {/* //? Content  */}
        <div className='w-full flex flex-col items-center gap-y-2'>
          <DeleteImage />
          <span className='font-medium text-[#000] 2xl:text-lg text-base'>Are you sure you want to delete this Flight?</span>
        </div>
        {/* //? modal footer */}
        <div className='flex items-center justify-end gap-x-4 mt-10'>
          <LabelButton
            label="No"
            handleClick={handleCancel}
            styles="bg-transparent border border-gray-400 2xl:h-10 h-8 text-gray-600 font-semibold flex items-center !px-6 !py-4 !rounded-[8px]"
          />
          <LabelButton
            label={isPending ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} /> : "Yes"}
            handleClick={handleDeleteFlight}
            styles="bg-primaryColor 2xl:h-10 h-8 text-white font-semibold flex items-center !px-6 !py-4 !rounded-[8px]"
          />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteFlight