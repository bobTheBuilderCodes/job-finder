import React, { useEffect, useRef, useState } from 'react';
import { MdMoreVert } from 'react-icons/md';
import { formatCreatedAt } from '../../helpers';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

interface DropdownOption {
  label: string;
  action: (item: any) => void;
}

interface TableColumn {
  label: string;
  accessor: string;
  isDate?: boolean;  // Optional flag to indicate if the column is a date
}

interface TableProps {
  data: Array<any>;
  columns: Array<TableColumn>;
  dropdownOptions?: DropdownOption[];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="flex justify-between items-center p-6 bg-white">
      <span className='mr-auto'>
        Page {currentPage} of {totalPages || currentPage}
      </span>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="disabled:opacity-50 font-semibold border-2 py-2 px-6 rounded-lg border-gray-200"
      >
        Prev
      </button>
      
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="disabled:opacity-50 font-semibold border-2 py-2 px-6 ml-4 rounded-lg border-gray-200"
      >
        Next
      </button>
    </div>
  );
};

const Table: React.FC<TableProps> = ({ data, columns, dropdownOptions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [dropdownOpen, setDropdownOpen] = useState<Array<boolean>>(Array(data?.length).fill(false));
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRefs.current && !dropdownRefs.current.some(ref => ref && ref.contains(event.target as Node))) {
        setDropdownOpen(Array(data?.length).fill(false));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [data?.length]);

  const toggleDropdown = (index: number) => {
    const newDropdownOpen = Array(data?.length).fill(false);
    newDropdownOpen[index] = !dropdownOpen[index];
    setDropdownOpen(newDropdownOpen);
  };

  const renderTableRows = () => {
    if (data && data.length > 0) {
      return data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item, idx) => (
        <tr key={idx}>
          {columns.map((column, colIndex) => (
            <td key={colIndex} className="px-5 border-b border-gray-200 bg-white text-sm text-gray-700">
              {column.isDate ? formatCreatedAt(item[column.accessor]) : item[column.accessor]}
            </td>
          ))}
          <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-right">
            <div className="relative inline-block text-left" ref={el => dropdownRefs.current[idx] = el}>
              <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" onClick={() => toggleDropdown(idx)}>
                <MdMoreVert />
              </button>
              {dropdownOpen[idx] && (
                <div className="cursor-pointer z-10 origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none " role="menu" aria-orientation="vertical">
                  {dropdownOptions && dropdownOptions.map((option, optionIndex) => (
                    <p key={optionIndex} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-50" role="menuitem" onClick={() => { option.action(item); toggleDropdown(idx); }}>
                      {option.label}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td colSpan={columns.length + 1} className="text-center py-10 items-center h-[30vh]">
            No data found
          </td>
        </tr>
      );
    }
  };

  return (
    <div className='m-8 rounded-lg'>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            {columns.map((column, idx) => (
              <th key={idx} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {column.label}
              </th>
            ))}
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
      {data && data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={data?.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Table;



