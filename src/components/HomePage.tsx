import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Monitor,
  Cpu,
  Laptop,
  X,
  LogOut,
  PlusCircle,
  Wifi,
  Calendar,
  Power,
  Trash2,
  Check,
  Eye,
  EyeOff,
  AlertCircle,
  Download,
  Router,
  Cable,
  Menu,
} from "lucide-react";

interface HomePageProps {
  onLogout: () => void;
}

interface ClientInfo {
  ip: string;
  mac: string;
}

interface Device {
  ip: string;
  mac: string;
  expiry: string;
  name?: string;
  type?: string;
  os?: string;
  vendor?: string;
  location?: string;
  notes?: string;
  added_by_user?: boolean;
  status?: boolean;
}

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      {type === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
      <span>{message}</span>
    </motion.div>
  );
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-md w-full"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 text-black">{title}</h3>
          <p className="text-gray-600 mb-4">{message}</p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              No, Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Yes, Revoke
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MobileHamburgerMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  downloadDocuments: Array<{
    title: string;
    description: string;
    url: string;
    icon: any;
    color: string;
  }>;
  handleDownload: (url: string, title: string) => void;
}> = ({ isOpen, onClose, downloadDocuments, handleDownload }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Network Setup
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {downloadDocuments.map((doc, index) => {
                  const IconComponent = doc.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 transition-all duration-300 hover:bg-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 ${doc.color} rounded-lg flex items-center justify-center`}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {doc.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-gray-600 text-xs mb-3">
                        {doc.description}
                      </p>

                      <button
                        onClick={() => handleDownload(doc.url, doc.title)}
                        className={`w-full ${doc.color} text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg`}
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  const mockUser = {
    name: "Merugu Sathwik",
    email: "ce22b074@smail.iitm.ac.in",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocLywKWUkmolnoQEJ3yAqHzx-EqxQ9chX48AMCgCCqy-3zCiEx3yjw=s360-c-no",
  };

  const [user] = useState(mockUser);
  const [clientInfo] = useState<ClientInfo>({
    ip: "192.168.1.10",
    mac: "AA:BB:CC:DD:EE:FF",
  });
  const [showIp, setShowIp] = useState(true);
  const [approved, setApproved] = useState(false);
  const [expiryOption, setExpiryOption] = useState("1h");
  const [customExpiry, setCustomExpiry] = useState("");
  const [approvedDevices, setApprovedDevices] = useState<Device[]>([]);
  const [sharedDevices, setSharedDevices] = useState<Device[]>([]);
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [personalMac, setPersonalMac] = useState("");
  const [deviceType, setDeviceType] = useState("non-router");
  const [deviceName, setDeviceName] = useState("");
  const [deviceNotes, setDeviceNotes] = useState("");
  const [deviceOS, setDeviceOS] = useState("");
  const [vendor, setVendor] = useState("");
  const [location, setLocation] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    deviceMac: "",
    deviceIp: "",
    title: "",
    message: "",
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const downloadDocuments = [
    {
      title: "IITM WiFi Setup",
      description: "Complete guide to connect to IITM WiFi network",
      url: "https://cc.iitm.ac.in/files/iitm-wifi.pdf",
      icon: Wifi,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Wireless Router Configuration",
      description: "Instructions for configuring your wireless router",
      url: "https://cc.iitm.ac.in/network/wirelessrouterconfiguration.html",
      icon: Router,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "LAN Connection Setup",
      description: "Step-by-step guide for LAN connection setup",
      url: "https://cc.iitm.ac.in/network/instructiontoconnectlan.html",
      icon: Cable,
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  const isPersonalIp = (ip: string): boolean => {
    return ip.startsWith("192.168."); // Example condition - adjust as needed
  };

  const getExpiryDate = () => {
    const now = new Date();
    switch (expiryOption) {
      case "1h":
        return new Date(now.getTime() + 60 * 60 * 1000).toISOString();
      case "1d":
        return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
      default:
        return new Date(now.getTime() + 60 * 60 * 1000).toISOString();
    }
  };

 const handleApprove = async () => {
  const expiry = getExpiryDate();
  const newDevice = {
    ip: clientInfo.ip,
    mac: clientInfo.mac,
    expiry,
    status: true,
  };

    setApproved(true);
    // setSharedDevices((prev) => [...prev, newDevice]);

    if (isPersonalIp(clientInfo.ip)) {
      setApprovedDevices((prev) => [...prev, newDevice]);
    } else {
      setSharedDevices((prev) => [...prev, newDevice]);
    }

    setToast({
      message: "Internet access approved successfully",
      type: "success",
    });
  };

  const handleRevoke = async (mac: string, ip: string) => {
    if (isPersonalIp(ip)) {
      setApprovedDevices((prev) =>
        prev.filter((device) => !(device.mac === mac && device.ip === ip))
      );
    } else {
      setSharedDevices((prev) =>
        prev.filter((device) => !(device.mac === mac && device.ip === ip))
      );
    }

    if (mac === clientInfo.mac && ip === clientInfo.ip) {
      setApproved(false);
    }

    setToast({
      message: "Internet access revoked successfully",
      type: "success",
    });
  };

  const confirmDeviceRemoval = (device: Device) => {
    setConfirmModal({
      isOpen: true,
      deviceMac: device.mac,
      deviceIp: device.ip,
      title: "Revoke Internet Access",
      message: `Are you sure you want to revoke internet access for ${
        device.name || "this device"
      }?`,
    });
  };

  const fetchVendor = async (mac: string) => {
    if (!mac || mac.length < 8) return;
    setVendor(mac.startsWith("AA") ? "Apple" : "Intel");
  };

  const handlePersonalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!personalMac || !deviceName) {
      setToast({
        message: "Please fill all required fields",
        type: "error",
      });
      return;
    }

    const expiry = new Date(
      new Date().getTime() + 365 * 24 * 60 * 60 * 1000
    ).toISOString();

    const newDevice = {
      ip: "Manual",
      mac: personalMac,
      name: deviceName,
      type: deviceType,
      os: deviceOS,
      vendor,
      location,
      notes: deviceNotes,
      expiry,
      added_by_user: true,
      status: true,
    };

    setApprovedDevices((prev) => [...prev, newDevice]);
    setShowPersonalForm(false);
    setPersonalMac("");
    setDeviceName("");
    setDeviceType("non-router");
    setDeviceNotes("");
    setDeviceOS("");
    setVendor("");
    setLocation("");

    setToast({
      message: "Personal device added successfully",
      type: "success",
    });
  };

  const handleDownload = (url: string, title: string) => {
    window.open(url, "_blank");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 px-4 py-8 md:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Profile Section with Integrated Network Documentation */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Mobile Hamburger Button */}
          <div className="lg:hidden mb-4 flex justify-start">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Profile Information */}
            <div className="flex-1 ">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 space-y-4 sm:space-y-4">
                {/* Avatar */}
                <img
                  src={user.picture}
                  alt="User Avatar"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-100 shadow"
                />

                {/* User Details */}
                <div className="text-center sm:text-left sm:space-y-3">
                  <h2 className="text-xl font-bold text-black break-words">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 break-words">{user.email}</p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-semibold">Roll No:</span>{" "}
                    {user.rollNumber || "Not provided"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Department:</span>{" "}
                    {user.department || "Not provided"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Mobile Number:</span>{" "}
                    {user.mobile || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Network Documentation - Desktop Only */}
            <div className="hidden lg:block lg:w-96">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Network Setup Documentation
              </h3>

              <div className="space-y-3">
                {downloadDocuments.map((doc, index) => {
                  const IconComponent = doc.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100 hover:shadow-sm"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 ${doc.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm truncate">
                            {doc.title}
                          </h4>
                          <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                            {doc.description}
                          </p>
                        </div>

                        <button
                          onClick={() => handleDownload(doc.url, doc.title)}
                          className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                          title="Download Guide"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Hamburger Menu */}
        <MobileHamburgerMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          downloadDocuments={downloadDocuments}
          handleDownload={handleDownload}
        />

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-black">
          {/* Main Content - Reordered for mobile */}
          <div className="md:col-span-8 space-y-2 order-2 md:order-1">
            {/* Network Details for Mobile */}
            <div className="md:hidden">
              <NetworkDetails
                clientInfo={clientInfo}
                showIp={showIp}
                setShowIp={setShowIp}
                expiryOption={expiryOption}
                setExpiryOption={setExpiryOption}
                approved={approved}
                handleApprove={handleApprove}
              />
            </div>
            <h1 className="text-2xl font-bold text-black mb-4">
              Device Management
            </h1>
            {/* Shared/Public Devices FIRST */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* <h1 className="text-2xl font-bold text-black mb-4">
    Device Management
  </h1> */}
              <h2 className="text-xl font-bold mb-6">Shared/Public Devices</h2>

              {sharedDevices.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Monitor className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p>No shared devices approved yet</p>
                </div>
              ) : (
                <DeviceList
                  devices={sharedDevices}
                  onRevoke={confirmDeviceRemoval}
                  formatDate={formatDate}
                />
              )}
            </motion.div>

            {/* Personal Devices SECOND */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Personal Devices</h2>
                <button
                  onClick={() => setShowPersonalForm(true)}
                  className="text-sm border border-black text-black px-3 py-1.5 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <PlusCircle size={16} />
                  <span>Add Device</span>
                </button>
              </div>

              {approvedDevices.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Monitor className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p>No personal devices added yet</p>
                </div>
              ) : (
                <DeviceList
                  devices={approvedDevices}
                  onRevoke={confirmDeviceRemoval}
                  formatDate={formatDate}
                />
              )}
            </motion.div>
          </div>

          {/* Right Column - Network Details (Hidden on Mobile) */}
          <div className="md:col-span-4 space-y-8 order-1 md:order-2 hidden md:block">
            <NetworkDetails
              clientInfo={clientInfo}
              showIp={showIp}
              setShowIp={setShowIp}
              expiryOption={expiryOption}
              setExpiryOption={setExpiryOption}
              approved={approved}
              handleApprove={handleApprove}
            />
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Personal Device Modal */}
      <AnimatePresence>
        {showPersonalForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPersonalForm(false)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto text-black"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-bold">Add Personal Device</h3>
                <button
                  onClick={() => setShowPersonalForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handlePersonalSubmit} className="p-4 space-y-4">
                <div>
                  <label
                    htmlFor="mac"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    MAC Address
                  </label>
                  <input
                    id="mac"
                    type="text"
                    value={personalMac}
                    onChange={(e) => {
                      setPersonalMac(e.target.value);
                      fetchVendor(e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="AA:BB:CC:DD:EE:FF"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="deviceName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Device Name
                  </label>
                  <input
                    id="deviceName"
                    type="text"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="My Laptop"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="deviceType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Device Type
                  </label>
                  <select
                    id="deviceType"
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="non-router">Non-Router</option>
                    <option value="router">Router</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="deviceOS"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Operating System
                  </label>
                  <input
                    id="deviceOS"
                    type="text"
                    value={deviceOS}
                    onChange={(e) => setDeviceOS(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Windows, macOS, Android, etc."
                  />
                </div>

                <div>
                  <label
                    htmlFor="vendor"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Vendor
                  </label>
                  <input
                    id="vendor"
                    type="text"
                    value={vendor}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Home, Office, etc."
                  />
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    value={deviceNotes}
                    onChange={(e) => setDeviceNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Additional information..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Add Device
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPersonalForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <ConfirmationModal
            isOpen={confirmModal.isOpen}
            onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
            onConfirm={() =>
              handleRevoke(confirmModal.deviceMac, confirmModal.deviceIp)
            }
            title={confirmModal.title}
            message={confirmModal.message}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const NetworkDetails: React.FC<{
  clientInfo: ClientInfo;
  showIp: boolean;
  setShowIp: (show: boolean) => void;
  expiryOption: string;
  setExpiryOption: (option: string) => void;
  approved: boolean;
  handleApprove: () => void;
}> = ({
  clientInfo,
  showIp,
  setShowIp,
  expiryOption,
  setExpiryOption,
  approved,
  handleApprove,
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-4">Network Details</h2>

      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Wifi className="text-gray-400 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <p className="text-sm text-gray-500">IP Address</p>
              <p className="font-medium">
                {showIp ? clientInfo.ip : "••••••••••"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowIp(!showIp)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showIp ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Set Access Expiry:
          </label>
          <select
            value={expiryOption}
            onChange={(e) => setExpiryOption(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3"
          >
            <option value="1h">1 Hour</option>
            <option value="1d">1 Day</option>
          </select>
        </div>

        {!approved ? (
          <button
            onClick={handleApprove}
            className="w-full bg-black text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800"
          >
            <Wifi size={18} />
            <span>Approve Internet Access</span>
          </button>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
            <Wifi className="text-green-500 mr-3" size={20} />
            <div>
              <h3 className="font-medium text-green-800">Access Approved</h3>
              <p className="text-sm text-green-600">
                Device has internet access
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const DeviceList: React.FC<{
  devices: Device[];
  onRevoke: (device: Device) => void;
  formatDate: (date: string) => string;
}> = ({ devices, onRevoke, formatDate }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {devices.map((device, i) => (
        <motion.div
          key={`${device.mac}-${device.ip}`}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="rounded-full bg-gray-100 p-2 mr-3">
                {device.type === "router" ? (
                  <Wifi size={20} className="text-gray-600" />
                ) : (
                  <Laptop size={20} className="text-gray-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium">
                  {device.name || `Device ${i + 1}`}
                </h3>
                <p className="text-sm text-gray-500">
                  {device.type || "Unknown Type"}
                </p>
              </div>
            </div>
            <button
              onClick={() => onRevoke(device)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Revoke Access"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-500">IP Address:</span>
              <span className="font-mono">{device.ip}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="text-gray-500 flex items-center">
                <Clock size={14} className="mr-1" /> Expires:
              </span>
              <span>{formatDate(device.expiry)}</span>
            </p>
            {device.os && (
              <p className="flex justify-between">
                <span className="text-gray-500">OS:</span>
                <span>{device.os}</span>
              </p>
            )}
            {device.vendor && (
              <p className="flex justify-between">
                <span className="text-gray-500">Vendor:</span>
                <span>{device.vendor}</span>
              </p>
            )}
            {device.location && (
              <p className="flex justify-between">
                <span className="text-gray-500">Location:</span>
                <span>{device.location}</span>
              </p>
            )}
          </div>

          {device.notes && (
            <p className="mt-3 text-sm text-gray-600 border-t border-gray-100 pt-2">
              {device.notes}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default HomePage;
