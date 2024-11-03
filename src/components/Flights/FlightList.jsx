import { Image, Modal, Pagination, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetFlightPhoto, useGetFlights } from '../../services/useFlights';
import { calculateHeightOfTable } from '../helpers/calculateNumberOfRows';
import { useMatchesSize } from '../helpers/useMatchesSize';
import { useMobileSize } from '../helpers/useMobileSize';
import AddOrEditFlights from './CRUD/AddOrEditFlights';
import DeleteFlight from './CRUD/DeleteFlight';
import FlightCard from './FlightCard';
import FlightTableColumns from './FlightTableColumns';
import Header from './Header';
import './styles.scss';

const FlightList = React.memo(() => {

  const matches = useMatchesSize()
  const mobileSize = useMobileSize()
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchParams.get('code') || '');

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(Number(searchParams.get('pageSize')) || 10);
  const [showAddOrEditModal, setShowAddOrEditModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [flightToDelete, setFlightToDelete] = useState(null)
  const [flightToEdit, setFlightToEdit] = useState(null)
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [previewFlightId, setPreviewFlightId] = useState(null);


  const { data: flights, isLoading, isFetching, isError } = useGetFlights({ page, size: pageSize, code: debouncedSearchTerm || searchParams?.get('code') });
  const totalRecords = flights?.total || 0;

  //! *********************************************** handle image preview ***********************************************

  const { data: imageBlob, refetch: fetchFlightPhoto } = useGetFlightPhoto(previewFlightId);

  useEffect(() => {
    if (imageBlob) {
      const imageUrl = URL.createObjectURL(imageBlob);
      setPreviewImageUrl(imageUrl);
      setShowImagePreview(true);

      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [imageBlob]);

  const handleImageClick = (id) => {
    setPreviewFlightId(id);
    fetchFlightPhoto();
  };
  const handleCloseImagePreview = () => {
    setShowImagePreview(false);
    setPreviewImageUrl(null);
    setPreviewFlightId(null);
  };
  //! *********************************************************************************************************************

  const columns = FlightTableColumns({
    setShowDeleteModal,
    setFlightToDelete,
    setShowAddOrEditModal,
    setFlightToEdit,
    setModalType: () => setModalType("edit"),
    onImageClick: handleImageClick,
  });

  //! *********************************************** handle url params ***********************************************

  useEffect(() => {
    const newSearchParams = searchParams
    newSearchParams.set('page', page);
    newSearchParams.set('pageSize', pageSize);
    setSearchParams(newSearchParams, { replace: true });
  }, [page, pageSize, searchParams, setSearchParams]);

  useEffect(() => {
    const isValidPage = /^\d+$/.test(page) && page > 0;
    const isValidPageSize = /^\d+$/.test(pageSize) && [10, 20, 50].includes(pageSize);

    if (!isValidPage || !isValidPageSize) {
      navigate('/bad-request');
    }
  }, [page, pageSize, navigate]);

  useEffect(() => {
    const newSearchParams = searchParams;
    if (debouncedSearchTerm !== '') {
      newSearchParams.set('code', debouncedSearchTerm);
      newSearchParams.delete('page');
    } else {
      newSearchParams.delete('code');
    }
    setSearchParams(newSearchParams, { replace: true });
  }, [debouncedSearchTerm, searchParams, setSearchParams]);

  //! *********************************************************************************************************************

  const handleTableChange = (newPage, newPageSize) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };


  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const scrolling = matches ? calculateHeightOfTable(240) : calculateHeightOfTable(250);

  return (
    <div className="w-full overflow-hidden flightsTable">
      <Header
        debouncedSearchTerm={debouncedSearchTerm}
        setDebouncedSearchTerm={setDebouncedSearchTerm}
        setShowAddModal={() => {
          setShowAddOrEditModal(true);
          setModalType("add");
          setFlightToEdit(null);
        }}
        pageSize={pageSize}
        handlePageSizeChange={handlePageSizeChange}
      />
      {(debouncedSearchTerm && (flights?.resources?.length < 1 || isError)) && (
        <p className='text-red-500 ml-4 mb-2'>There is no flights matching this search</p>
      )}

      {(isLoading || isFetching) ? (
        <Spin size="large" />
      ) : mobileSize ? (
        <div className='overflow-auto h-[calc(100vh-130px)]'>
          {/****************************** mobile view ******************************/}
          {flights?.resources?.map(flight => (
            <FlightCard
              key={flight?.id}
              title={`Flight Code: ${flight?.code}`}
              id={flight?.id}
              img={flight?.img}
              bodyContent={
                <div>
                  <p>Capacity: {flight?.capacity}</p>
                  <p>Departure Date: {flight?.departureDate}</p>
                </div>
              }
              onEdit={() => {
                setShowAddOrEditModal(true);
                setModalType("edit");
                setFlightToEdit(flight);
              }}
              onDelete={() => {
                setShowDeleteModal(true);
                setFlightToDelete(flight.id);
              }}
              onImageClick={flight.img ? handleImageClick : null}
            />
          ))}
          <Pagination
            current={page}
            pageSize={pageSize}
            total={totalRecords}
            onChange={(newPage, newPageSize) => {
              setPage(newPage);
              setPageSize(newPageSize);
            }}
            className="mt-4 text-center"
          />
        </div>
      ) : (
        <Table
          rowKey="id"
          className='tableWithActions'
          columns={columns}
          dataSource={flights?.resources || []}
          loading={isLoading}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: totalRecords,
            onChange: handleTableChange,
          }}
          scroll={{
            y: scrolling,
          }}
        />
      )}
      {/****************************** add/edit flight modal ******************************/}
      {showAddOrEditModal && (
        <AddOrEditFlights
          handleCloseModal={() => setShowAddOrEditModal(false)}
          setPage={setPage}
          isAddModalOpen={showAddOrEditModal}
          type={modalType}
          flightToEdit={modalType === "edit" ? flightToEdit : null}
        />
      )}
      {/****************************** delete flight modal ******************************/}
      {showDeleteModal && (
        <DeleteFlight
          itemToDelete={flightToDelete}
          isDeleteModalOpen={showDeleteModal}
          handleCloseModal={() => setShowDeleteModal(false)}
        />
      )}
      {/****************************** image preview modal ******************************/}
      <Modal
        open={showImagePreview}
        onCancel={handleCloseImagePreview}
        footer={null}
        centered

        className="flex items-center justify-center 2xl:!w-[550px] lg:!w-[480px] xs:!w-[350px]"
      >
        <div className="flex items-center justify-center p-2"> {/* Ensures consistent width and height */}
          <Image
            src={previewImageUrl}
            alt="Flight"
            className="rounded-lg object-cover 2xl:!w-[450px] 2xl:!h-[450px] lg:!w-[380px] lg:!h-[380px]  xs:!w-[250px] xs:!h-[250px]"
          />
        </div>
      </Modal>

    </div>
  );
});

export default FlightList;
