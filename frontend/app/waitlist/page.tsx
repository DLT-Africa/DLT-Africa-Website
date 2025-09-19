"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const WaitlistAdmin = () => {
  interface WaitlistEntry {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    createdAt: string;
  }

  const [waitlistData, setWaitlistData] = useState<WaitlistEntry[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<WaitlistEntry[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [waitlistActive, setWaitlistActive] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchWaitlist = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/waitlist/`
        );
        setWaitlistData(response.data.data);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.error("Error fetching waitlist:", error);
        if (error.response && error.response.status === 400) {
          setMessage("Cannot fetch waitlist data");
          return;
        }

        setMessage("Server error");
      }
    };
    fetchWaitlist();
  }, []);

  // Fetch waitlist status
  useEffect(() => {
    const fetchWaitlistStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/settings/waitlist-status`
        );
        setWaitlistActive(response.data.waitlistActive);
      } catch (error: any) {
        console.error("Error fetching waitlist status:", error);
      }
    };
    fetchWaitlistStatus();
  }, []);

  useEffect(() => {
    const filteredWaitlist = waitlistData.filter(
      (entry: WaitlistEntry) =>
        entry.name.toLowerCase().includes(search.toLowerCase()) ||
        entry.email.toLowerCase().includes(search.toLowerCase()) ||
        (entry.phone && entry.phone.includes(search))
    );
    setSearchResults(filteredWaitlist);
  }, [search, waitlistData]);

  const handleDelete = async (id: string) => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Are you sure you want to delete this waitlist entry?")
    ) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/waitlist/${id}`
        );
        setWaitlistData(
          waitlistData.filter((entry: WaitlistEntry) => entry._id !== id)
        );
        setMessage("Waitlist entry deleted successfully");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        console.error("Error deleting waitlist entry:", error);
        setMessage("Failed to delete waitlist entry");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  const exportToCSV = () => {
    // Check if we're on the client side
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const csvContent = [
      ["Name", "Email", "Phone", "Joined Date"],
      ...waitlistData.map((entry: WaitlistEntry) => [
        entry.name,
        entry.email,
        entry.phone || "N/A",
        new Date(entry.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    // Check if we're on the client side
    if (typeof document !== "undefined") {
      const a = document.createElement("a");
      a.href = url;
      a.download = `waitlist-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const toggleWaitlistStatus = async () => {
    setIsUpdatingStatus(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/settings/waitlist-status`,
        { waitlistActive: !waitlistActive }
      );

      setWaitlistActive(!waitlistActive);
      setMessage(response.data.message);
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      console.error("Error updating waitlist status:", error);
      setMessage("Failed to update waitlist status");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading waitlist data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Waitlist Management
        </h1>
        <p className="text-gray-600">
          Manage and monitor waitlist entries for upcoming cohorts
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link href="/admin-dashboard">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200">
            Admission List
          </button>
        </Link>
        <Link href="/team-list">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200">
            Team List
          </button>
        </Link>
        <Link href="/event-list">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200">
            Event List
          </button>
        </Link>
        <Link href="/corpers">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200">
            Corper's List
          </button>
        </Link>
        <button className="px-4 py-2 bg-[#FC7C13] text-white rounded-lg">
          Waitlist
        </button>
      </div>

      {/* Waitlist Status Toggle */}
      <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Waitlist Status
            </h3>
            <p className="text-sm text-gray-600">
              {waitlistActive
                ? "Waitlist is currently ACTIVE - Users will see 'Join Waitlist' button"
                : "Waitlist is INACTIVE - Users will see 'Register' button"}
            </p>
          </div>
          <button
            onClick={toggleWaitlistStatus}
            disabled={isUpdatingStatus}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FC7C13] focus:ring-offset-2 ${
              waitlistActive ? "bg-[#FC7C13]" : "bg-gray-200"
            } ${isUpdatingStatus ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                waitlistActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        {isUpdatingStatus && (
          <div className="mt-2 text-sm text-gray-500">Updating status...</div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700">Total Entries</h3>
          <p className="text-3xl font-bold text-[#FC7C13]">
            {waitlistData.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700">This Month</h3>
          <p className="text-3xl font-bold text-[#FC7C13]">
            {
              waitlistData.filter(
                (entry: WaitlistEntry) =>
                  new Date(entry.createdAt).getMonth() ===
                    new Date().getMonth() &&
                  new Date(entry.createdAt).getFullYear() ===
                    new Date().getFullYear()
              ).length
            }
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700">With Phone</h3>
          <p className="text-3xl font-bold text-[#FC7C13]">
            {waitlistData.filter((entry: WaitlistEntry) => entry.phone).length}
          </p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md border mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FC7C13] focus:border-transparent"
            />
          </div>
          <button
            onClick={exportToCSV}
            className="px-6 py-2 bg-[#FC7C13] text-white rounded-lg hover:bg-[#e66a0a] transition duration-300"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-200 rounded-lg">
          {message}
        </div>
      )}

      {/* Waitlist Table */}
      <div className="bg-white rounded-lg shadow-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((entry: WaitlistEntry) => (
                <tr key={entry._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {entry.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {entry.phone || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(entry.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="text-red-600 hover:text-red-900 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, searchResults.length)}
                  </span>{" "}
                  of <span className="font-medium">{searchResults.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? "z-10 bg-[#FC7C13] border-[#FC7C13] text-white"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {waitlistData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No waitlist entries found</div>
          <div className="text-gray-400 text-sm mt-2">
            Waitlist entries will appear here once users start joining
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitlistAdmin;
