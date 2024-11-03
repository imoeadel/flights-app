import React from 'react'
import { ReactComponent as EyeIcon } from '../../assets/eye.svg'


const FlightTableColumns = ({
  setShowDeleteModal,
  setFlightToDelete,
  setShowAddOrEditModal,
  setFlightToEdit,
  setModalType,
  onImageClick,
}) => {


  return [
    { title: 'Code', dataIndex: 'code', key: 'code' },
    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
    { title: 'Departure Date', dataIndex: 'departureDate', key: 'departureDate' },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (text, record) => (
        <div className='flex gap-2 items-center justify-start'>
          {record?.img && (
            <button
              title='View Image'
              type='button'
              onClick={() => onImageClick(record?.id)}
            >
              <EyeIcon className='w-5 h-5' />
            </button>
          )}
        </div>
      )
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div className='flex gap-2 items-center justify-start'>

          <button
            className='2xl:w-[70px] w-[60px] 2xl:h-8 h-7 border-red-400 text-red-400 rounded-md border'
            onClick={() => {
              setShowDeleteModal(true);
              setFlightToDelete(record?.id);
            }}

          >
            Delete
          </button>
          <button
            className='bg-primaryColor 2xl:w-[70px] w-[60px] text-white 2xl:h-8 h-7 rounded-md'
            onClick={() => {
              setModalType()
              setShowAddOrEditModal(true);
              setFlightToEdit(record);
            }}
          >
            Edit
          </button>
        </div>
      ),
    },
  ]
}

export default FlightTableColumns