import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function VerticalMenu({ onLogout, username }) {
  return (
    <div className='w-1/5 shadow-md p-4 mt-4 mb-4 ml-4' style={{ backgroundColor: '#181828' }}>
      <h3 className='text-xl font-bold mb-4 text-white'>Menu</h3>
      
      {/* Profile Image and Username */}
      <div className='flex items-center mb-10'>
        <div className='w-16 h-16 bg-gray-300 rounded-lg'></div>
        <span className='ml-4 text-white text-lg'>{username}</span>
      </div>

      <ul className='space-y-2'>
        <li>
          <button className='w-full text-left p-2 bg-gray-700 hover:bg-gray-200 rounded text-white'>
            <FontAwesomeIcon icon={faHome} className='mr-2' />
            Home
          </button>
        </li>
        <li>
          <button className='w-full text-left p-2 bg-gray-700 hover:bg-gray-200 rounded text-white'>
            <FontAwesomeIcon icon={faUser} className='mr-2' />
            Profile
          </button>
        </li>
        <li>
          <button className='w-full text-left p-2 bg-gray-700 hover:bg-gray-200 rounded text-white'>
            <FontAwesomeIcon icon={faCog} className='mr-2' />
            Settings
          </button>
        </li>
        <li>
          <button onClick={onLogout} className='w-full text-left p-2 bg-gray-700 hover:bg-gray-200 rounded text-white'>
            <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default VerticalMenu;