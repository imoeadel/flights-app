import { Select } from 'antd'
import React from 'react'
import { useMobileSize } from '../helpers/useMobileSize'
import SearchInput from '../lib/SearchInput'

const Header = ({
  debouncedSearchTerm,
  setDebouncedSearchTerm,
  setShowAddModal,
  pageSize,
  handlePageSizeChange,

}) => {

  const mobileSize = useMobileSize()

  return (
    <div className='w-full flex justify-between px-3 mb-2'>
      <SearchInput
        placeholder="Search by code"
        searchTerm={debouncedSearchTerm}
        setSearchTerm={setDebouncedSearchTerm}
        width='2xl:w-[17%] w-[15%] xs:w-[50%]'
        styles='!rounded-[5px] !shadow-none border border-[#DDDDDD] 2xl:!h-[42px] !h-[38px]'
      />
      <div className='flex gap-2 items-center'>
        {!mobileSize && <label>Flights per page:</label>}
        <Select
          defaultValue={pageSize}
          onChange={handlePageSizeChange}
          options={[{ value: 10, label: '10' }, { value: 20, label: '20' }, { value: 50, label: '50' }]}
          className="w-24 xs:w-16 2xl:!h-[42px] !h-[38px]"
        />
        <button onClick={setShowAddModal} className='bg-primaryColor text-white border-none 2xl:px-4 px-3 py-1 rounded-md 2xl:!h-[42px] !h-[38px]'>
          Add Flight
        </button>
      </div>
    </div>
  )
}

export default Header