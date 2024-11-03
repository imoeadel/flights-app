import { Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import { ReactComponent as ThreeDots } from "../../assets/threeDots.svg";


const FlightCard = ({ title, bodyContent, onEdit, onDelete, onImageClick, img, id }) => {

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);



  const menu = (
    <Menu>
      {img && (
        <Menu.Item onClick={() => onImageClick(id)} key="image">
          Show Image
        </Menu.Item>
      )}
      <Menu.Item onClick={onEdit} key="edit">
        Edit
      </Menu.Item>
      <Menu.Item onClick={onDelete} key="delete">
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="relative p-4 border border-gray-200 rounded-lg shadow-sm bg-white mb-4 mx-3">
      <Dropdown overlay={menu} trigger={['click']} open={isDropdownVisible} onOpenChange={toggleDropdown}>
        <div className="absolute top-2 right-2 cursor-pointer">
          <ThreeDots className="w-6 h-6 text-gray-500" />
        </div>
      </Dropdown>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <div className="text-gray-600 text-base">
        {bodyContent}
      </div>
    </div>
  );
}

export default FlightCard;
