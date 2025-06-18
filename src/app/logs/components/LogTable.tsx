"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  Tooltip,
  HelperText,
  Pagination,
  Input,
  Modal,
  Chip,
  DropdownWithIcon,
  TableDataCell,
} from "@atomos_tech/genesis";
import {
  RiEyeLine,
  RiSearchLine,
  RiMailLine,
  RiUserLine,
  RiErrorWarningLine,
  RiComputerLine,
  RiGlobalLine,
  RiBuilding2Line,
  RiUser3Line,
  RiFilterLine,
} from "@remixicon/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatDateTime } from "@/app/utils/helper";
import TableLoader from "@/app/components/TableLoader";
import { useDebounce } from "@/app/__hooks/useDebounce";
import { Option } from "@/app/utils/__types";
import { recipientOptions, statusOptions } from "@/app/utils/data";

  


type EmailLog = {
  _id: string;
  eventType: string;
  status: number;
  from: string;
  to: string;
  errorMessage: string | null;
  messageId: string;
  self: boolean;
  ipAddress: string;
  userAgent: string;
  
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    countryCode: string;
    phoneNumber: string;
    message: string;
    demoTopics: string[];
    fullName?:string;
    address?:string;
    team?:string;
    otherTeam?:string;
    resources?:string[];
    reason?:string;
    otherReason?:string;
    purpose?:string;
    otherPurpose?:string
  };
  emailResponse: {
    accepted: string[];
    rejected: string[];
    ehlo: string[];
    envelopeTime: number;
    messageTime: number;
    messageSize: number;
    response: string;
    envelope: {
      from: string;
      to: string[];
    };
    messageId: string;
  };
  sourceUrl: string;
  createdAt: string;
  updatedAt: string;
};

type EmailLogsTableProps = {
  logs: {
    data: EmailLog[];
    pagination?: {
      total: number;
      page: number;
      limit: number;
    };
  };
  isLoading: boolean;
  error: any;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  setRecipientStatus:Dispatch<SetStateAction<Option[]>>,
  recipientStatus:Option[],
  setStatus:Dispatch<SetStateAction<Option[]>>
  status:Option[],
  tabValue:string;
  setSearch:Dispatch<SetStateAction<string>>
};

export const EmailLogsTable: React.FC<EmailLogsTableProps> = ({
  logs,
  isLoading,
  error,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  setRecipientStatus,
  recipientStatus,
  setStatus,
  status,
  tabValue,
  setSearch
}) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<EmailLog | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 1000);


  useEffect(()=>{
        setSearch(debouncedSearch)
  },[debouncedSearch])

  const handleViewDetails = (log: EmailLog) => {
    setSelectedLog(log);
    setShowDetailModal(true);
  };

  const getStatusBadge = (status: number, errorMessage: string | null) => {
    if (status === 0) {
      return (
        <Chip intent="success">
          Delivered
        </Chip>
      );
    } else {
      return (
        <Chip intent="error">
          Failed
        </Chip>
      );
    }
  };

  
  

  const getRecipientType = (self: boolean) => {
    return self ? (
      <span className="flex items-center gap-1 text-blue-600">
        <RiBuilding2Line className="w-4 h-4" />
        Company
      </span>
    ) : (
      <span className="flex items-center gap-1 text-green-600">
        <RiUser3Line className="w-4 h-4" />
        User
      </span>
    );
  };

  const getRecipientName = (log: EmailLog) => {
    return log.self 
      ?  "Company" 
      : (log.formData?.firstName && log.formData?.lastName
          ? `${log.formData.firstName} ${log.formData.lastName}`
          : log?.formData?.fullName?log.formData?.fullName :"N/A");
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load email logs
      </div>
    );
  }

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <div className="mb-10">
      <div className="flex">
        <Input
          type="search"
          startIcon={<RiSearchLine className="text-gray-400 w-4 h-4" />}
          className="w-fit min-w-[300px] my-4"
          placeholder="Search by email, event type, or recipient"
          value={searchInput}
          disabled={isLoading}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {isLoading ? (
        <TableLoader rows={25} />
      ) : (
        <Table className="min-w-full">
          <TableHead>
            <TableRow>
                
                {
                    tabValue=='0'?<TableHeadCell className="min-w-[120px]">
                    Event Type
                  </TableHeadCell>:null
                }
            
              <TableHeadCell className="min-w-[160px]"
              
              icon={
                <DropdownWithIcon
                  options={recipientOptions}
                  selected={recipientStatus}
                  setSelected={setRecipientStatus}
                  width="200px"
                  trigger={
                    <RiFilterLine
                      className="hover:bg-gray-200 rounded"
                      style={{ cursor: "pointer" }}
                      size={14}
                    />
                  }
                />
              }
              >Recipient Type</TableHeadCell>
              <TableHeadCell className="min-w-[200px]">From</TableHeadCell>
              <TableHeadCell className="min-w-[200px]">To</TableHeadCell>
              <TableHeadCell className="min-w-[150px]">
                Recipient Name
              </TableHeadCell>
              <TableHeadCell className="min-w-[150px]">
                Date
              </TableHeadCell>
              <TableHeadCell className="min-w-[100px]"
               icon={
                <DropdownWithIcon
                  options={statusOptions}
                  selected={status}
                  setSelected={setStatus}
                  width="200px"
                  trigger={
                    <RiFilterLine
                      className="hover:bg-gray-200 rounded"
                      style={{ cursor: "pointer" }}
                      size={14}
                    />
                  }
                />
              }
            >
              
              Status</TableHeadCell>
              <TableHeadCell className="w-[80px]">Actions</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {logs?.data?.map((log: EmailLog) => (
              <TableRow key={log._id} >
                {
                    tabValue=='0'? <TableHeadCell>
                    <Chip
                    intent={"default"}
                    >
                      {log.eventType=='bookDemoLead'?'bookDemoMRKT':log.eventType}
                    </Chip>
                  </TableHeadCell>:null
                }
               
                <TableHeadCell>
                  {getRecipientType(log.self)}
                </TableHeadCell>
                <TableDataCell>
                <Tooltip
                        content={log.from || "Not Available"}
                        position={"top"}
                        className="text-white bg-gray-800 text-sm text-nowrap"
                      >
                        <p className="text-ellipsis max-w-[150px] overflow-hidden">
                          {log.from || "N/A"}
                        </p>
                      </Tooltip>
                      </TableDataCell>                
                    <TableDataCell>
                      <Tooltip
                        content={log.to || "Not Available"}
                        position={"top"}
                        className="text-white bg-gray-800 text-sm text-nowrap"
                      >
                        <p className="text-ellipsis max-w-[150px] overflow-hidden">
                          {log.to || "N/A"}
                        </p>
                      </Tooltip>
                      </TableDataCell> 
                <TableHeadCell>
                  {getRecipientName(log)}
                </TableHeadCell>
                <TableHeadCell>
                  <Tooltip
                    content={formatDateTime(log.createdAt)}
                    position="top"
                    className="text-white bg-gray-800 text-sm"
                  >
                    <span>{formatDateTime(log.createdAt)}</span>
                  </Tooltip>
                </TableHeadCell>
                <TableHeadCell>
                  {getStatusBadge(log.status, log.errorMessage)}
                </TableHeadCell>
                <TableHeadCell>
                  <div className="flex justify-center">
                    <Tooltip
                      content="View Details"
                      position="left"
                      className="text-white bg-gray-800 text-sm"
                    >
                      <button
                        className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
                        onClick={() => handleViewDetails(log)}
                      >
                        <RiEyeLine size={18} />
                      </button>
                    </Tooltip>
                  </div>
                </TableHeadCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Detail Modal */}
      <Modal showModal={showDetailModal} setShowModal={setShowDetailModal} closeModal={true}>
        <div className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div>
            <h1 className="flex items-center text-xl font-semibold gap-2">
              Email Log Details
            </h1>
          </div>
          <div className="p-4">
            {selectedLog && (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <RiMailLine className="text-blue-500" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Event Type
                      </label>
                      <Chip
                      className="mt-1"
                       intent={"warning"}
                      >
                        {selectedLog.eventType=='bookDemoLead'?'bookDemoMRKT':selectedLog.eventType}
                      </Chip>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Recipient Type
                      </label>
                      <div className="mt-1 text-sm ">
                        {getRecipientType(selectedLog.self)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        From
                      </label>
                      <p className="mt-1 text-sm">{selectedLog.from}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        To
                      </label>
                      <p className="mt-1 text-sm">{selectedLog.to}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Recipient Name
                      </label>
                      <p className="mt-1 text-sm">
                        {getRecipientName(selectedLog)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                         Date
                      </label>
                      <p className="mt-1 text-xs break-all">
                        {formatDateTime(selectedLog.createdAt)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Message ID
                      </label>
                      <p className="mt-1 text-xs break-all">
                        {selectedLog.messageId || "Not Available"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Source URL
                      </label>
                      <p className="mt-1 text-xs">
                        {selectedLog.sourceUrl || "Not available"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                        <RiGlobalLine className="w-4 h-4" />
                        IP Address
                      </label>
                      <p className="mt-1 text-xs">
                        {selectedLog.ipAddress || "Not available"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                        <RiComputerLine className="w-4 h-4" />
                        User Agent
                      </label>
                      <p className="mt-1 text-xs break-all">
                        {selectedLog.userAgent || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Data */}
                {selectedLog.formData   &&  (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <RiUserLine className="text-blue-500" />
                      Submitted Form Data
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     
                        <>
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Name
                            </label>
                            <p className="mt-1 text-sm">
                              {selectedLog?.formData?.firstName?`${selectedLog.formData.firstName} ${selectedLog.formData.lastName}`:selectedLog.formData?.fullName}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Email
                            </label>
                            <p className="mt-1 text-sm">
                              {selectedLog.formData.email}
                            </p>
                          </div>
                        </>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Company
                        </label>
                        <p className="mt-1 text-sm">
                          {selectedLog.formData.companyName}
                        </p>
                      </div>
                 
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Phone
                          </label>
                          <p className="mt-1 text-sm">
                            {`${selectedLog.formData.countryCode} ${selectedLog.formData.phoneNumber}`}
                          </p>
                        </div>
                      
                      <div >
                        <label className="text-sm font-medium text-gray-600">
                          Message
                        </label>
                        <p className="mt-1 text-sm">
                          {selectedLog.formData.message||"NA"}
                        </p>
                      </div>
                    {
                        selectedLog.formData.address ?<div className="">
                        <label className="text-sm font-medium text-gray-600">
                          Adress
                        </label>
                        <p className="mt-1 text-sm">
                          {selectedLog.formData.address||"NA"}
                        </p>
                      </div>:null
                    }

                    {
                        selectedLog?.formData?.team?<div className="">
                        <label className="text-sm font-medium text-gray-600">
                          Selected Team For CallBack
                        </label>
                        <p className="mt-1 text-sm">
                          {selectedLog?.formData?.team||"NA"}
                        </p>
                      </div>:null
                    }

{
                        selectedLog?.formData?.purpose?<div className="">
                        <label className="text-sm font-medium text-gray-600">
                          Selected Purpose For CallBack
                        </label>
                        <p className="mt-1 text-sm">
                          {selectedLog?.formData?.purpose||"NA"}
                        </p>
                      </div>:null
                    }


{
                        selectedLog?.formData?.otherPurpose?<div className="">
                        <label className="text-sm font-medium text-gray-600">
                        Purpose For CallBack
                        </label>
                        <p className="mt-1 text-sm">
                          {selectedLog?.formData?.otherPurpose||"NA"}
                        </p>
                      </div>:null
                    }

{
                        selectedLog?.formData?.otherTeam?<div className="">
                        <label className="text-sm font-medium text-gray-600">
                          Selected Team For CallBack
                        </label>
                        <p className="mt-1 text-sm">
                          {selectedLog?.formData?.otherTeam||"NA"}
                        </p>
                      </div>:null
                    }

                    {
                        selectedLog?.formData?.reason?<div className="">
                        <label className="text-sm font-medium text-gray-600">
                          Selected Reason for Resource Request
                        </label>
                        <p className="mt-1 text-sm">
                          {selectedLog?.formData?.reason||"NA"}
                        </p>
                      </div>:null
                    }


{
                        selectedLog?.formData?.otherReason?<div className="">
                        <label className="text-sm font-medium text-gray-600">
                           Reason Entered for Resource Request
                        </label>
                        <p className="mt-1 text-sm">
                          {selectedLog?.formData?.otherReason||"NA"}
                        </p>
                      </div>:null
                    }

{selectedLog.formData.resources &&
                        selectedLog.formData.resources.length > 0 && (
                          <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-600">
                              Selected Resources
                            </label>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {selectedLog.formData.resources.map(
                                (topic, index) => (
                                  <span
                                    key={"s"+index}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                                  >
                                    {topic}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {selectedLog.formData.demoTopics &&
                        selectedLog.formData.demoTopics.length > 0 && (
                          <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-600">
                              Demo Topics
                            </label>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {selectedLog.formData.demoTopics.map(
                                (topic, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                                  >
                                    {topic}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {selectedLog.errorMessage && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-red-700">
                      <RiErrorWarningLine className="text-red-500" />
                      Error Details
                    </h3>
                    <p className="text-sm text-red-700">
                      {selectedLog.errorMessage}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {logs?.data?.length === 0 && (
        <div className="w-full flex justify-center">
          <HelperText className="w-full text-center py-4">
            No email logs available
          </HelperText>
        </div>
      )}

      {logs?.data && logs.data.length > 0 && (
        <div className="border-t border-gray-200 bg-white">
          <Pagination
            count={logs.pagination?.total || logs.data.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[15, 50, 75, 100]}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  );
};