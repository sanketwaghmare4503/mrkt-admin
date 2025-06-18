"use client";

import { getLogCount, getLogsByStatus } from "@/app/actions/singleLogs";
import { Tab, TabList, TabPanel, TabsContainer } from "@atomos_tech/genesis";
import { useState } from "react";
import useSWR from "swr";
import { EmailLogsTable } from "./LogTable"; 
import { Option } from "@/app/utils/__types";
import { EVENT_TYPES, recipientOptions, statusOptions } from "@/app/utils/data";

export default function LogsContainer() {
  const { data: countData } = useSWR("/logs/get-count", getLogCount);

  const [value, setValue] = useState("0");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<Option[]>(statusOptions);
  const [recipientStatus, setRecipientStatus] =
    useState<Option[]>(recipientOptions);

  const handleTabChange = (newValue: string) => {
    setValue(newValue);
    setPage(0);
    setSearchQuery("");
  };

  const buildApiEndpoint = () => {
    const baseUrl = `/logs/logs-by-type/${EVENT_TYPES[value]}?status=${
      status[0].value || -1
    }&recipientStatus=${recipientStatus[0].value || -1}&page=${
      page + 1
    }&limit=${rowsPerPage}`;
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", rowsPerPage.toString());

    if (searchQuery.trim()) {
      params.append("search", searchQuery.trim());
    }

    return `${baseUrl}?${params.toString()}`;
  };

  const currentEndpoint = buildApiEndpoint();

  const { data, error, isLoading } = useSWR(
    currentEndpoint,
    () => getLogsByStatus(currentEndpoint),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <TabsContainer value={value} className=" container mx-auto mt-4">
        <div className="flex items-center justify-between">
          <TabList onChange={handleTabChange} ariaLabel="logs tabs" box={false}>
            <Tab
              label={`All (${countData?.data?.all})`}
              value="0"
              onChange={handleTabChange}
              selectedTabValue={value}
            />

            <Tab
              label={`Contact Sales (${countData?.data?.contactSales})`}
              value="1"
              onChange={handleTabChange}
              selectedTabValue={value}
            />
            <Tab
              label={`Book Demo (${countData?.data?.bookDemo})`}
              value="2"
              onChange={handleTabChange}
              selectedTabValue={value}
            />
            <Tab
              label={`Call Request (${countData?.data?.requestCall})`}
              value="3"
              onChange={handleTabChange}
              selectedTabValue={value}
            />
            <Tab
              label={`Book Demo MRKT (${countData?.data?.bookDemoLead})`}
              value="4"
              onChange={handleTabChange}
              selectedTabValue={value}
            />
            <Tab
              label={`Resource Request (${countData?.data?.resourceRequest})`}
              value="5"
              onChange={handleTabChange}
              selectedTabValue={value}
            />
          </TabList>
        </div>

        <div className="mt-1">
          <TabPanel value="0" currentValue={value}>
            <EmailLogsTable
              logs={data || { data: [] }}
              isLoading={isLoading}
              error={error}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              setStatus={setStatus}
              status={status}
              setRecipientStatus={setRecipientStatus}
              recipientStatus={recipientStatus}
              tabValue={value}
              setSearch={setSearchQuery}
            />
          </TabPanel>
          <TabPanel value="1" currentValue={value}>
            <EmailLogsTable
              logs={data || { data: [] }}
              isLoading={isLoading}
              error={error}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              setStatus={setStatus}
              status={status}
              setRecipientStatus={setRecipientStatus}
              recipientStatus={recipientStatus}
              tabValue={value}
              setSearch={setSearchQuery}
            />
          </TabPanel>
          <TabPanel value="2" currentValue={value}>
            <EmailLogsTable
              logs={data || { data: [] }}
              isLoading={isLoading}
              error={error}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              setStatus={setStatus}
              status={status}
              setRecipientStatus={setRecipientStatus}
              recipientStatus={recipientStatus}
              tabValue={value}
              setSearch={setSearchQuery}
            />
          </TabPanel>
          <TabPanel value="3" currentValue={value}>
            <EmailLogsTable
              logs={data || { data: [] }}
              isLoading={isLoading}
              error={error}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              setStatus={setStatus}
              status={status}
              setRecipientStatus={setRecipientStatus}
              recipientStatus={recipientStatus}
              tabValue={value}
              setSearch={setSearchQuery}
            />
          </TabPanel>
          <TabPanel value="4" currentValue={value}>
            <EmailLogsTable
              logs={data || { data: [] }}
              isLoading={isLoading}
              error={error}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              setStatus={setStatus}
              status={status}
              setRecipientStatus={setRecipientStatus}
              recipientStatus={recipientStatus}
              tabValue={value}
              setSearch={setSearchQuery}
            />
          </TabPanel>
          <TabPanel value="5" currentValue={value}>
            <EmailLogsTable
              logs={data || { data: [] }}
              isLoading={isLoading}
              error={error}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              setStatus={setStatus}
              status={status}
              setRecipientStatus={setRecipientStatus}
              recipientStatus={recipientStatus}
              tabValue={value}
              setSearch={setSearchQuery}
            />
          </TabPanel>{" "}
        </div>
      </TabsContainer>
    </div>
  );
}
