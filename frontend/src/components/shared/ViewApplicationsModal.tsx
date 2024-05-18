import React from 'react';
import Modal from '../shared/Modal';
import Table from '../shared/Table';

interface ViewApplicationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: any[];
  jobTitle: string;
}

const dropdownOptions = [
  { label: "Download Resume", action: () => {} },
  { label: "Invite for interview", action: () => {} },
  { label: "Reject application", action: () => {} },
];

const ViewApplicationsModal: React.FC<ViewApplicationsModalProps> = ({ isOpen, onClose, applications, jobTitle }) => {
  const columns = [
    { label: "Applicant Name", accessor: "fullname" },
    { label: "Email", accessor: "email" },
    { label: "Address", accessor: "address" },
    { label: "Date Applied", accessor: "createdAt", isDate: true },
    { label: "Salary Expectation", accessor: "salary_expectation" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} key={applications.length}>
      <div className="w-[96vw]">
        <h1 className="font-bold mb-2 text-2xl text-gray-900">{jobTitle}</h1>
        <p className="text-gray-500">View all applications for this job.</p>
        {applications.length > 0 ? (
          <Table data={applications} columns={columns} dropdownOptions={dropdownOptions} />
        ) : (
          <p className="text-gray-500">No applications found for this job.</p>
        )}
      </div>
    </Modal>
  );
};

export default ViewApplicationsModal;
