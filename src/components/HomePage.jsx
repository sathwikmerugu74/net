import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Monitor, Cpu, Laptop, X, LogOut, PlusCircle, Wifi, Calendar } from 'lucide-react';

const HomePage = ({ onLogout }) => {
  const mockUser = {
    name: "Merugu Sathwik",
    email: "ce22b074@smail.iitm.ac.in",
    picture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"
  };

  const [user, setUser] = useState(mockUser);
  const [clientInfo, setClientInfo] = useState({ ip: '192.168.1.100', mac: 'AA:BB:CC:DD:EE:FF' });
  const [approved, setApproved] = useState(false);
  const [expiryOption, setExpiryOption] = useState('1h');
  const [customExpiry, setCustomExpiry] = useState('');
  const [approvedDevices, setApprovedDevices] = useState([]);
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [personalMac, setPersonalMac] = useState('');
  const [deviceType, setDeviceType] = useState('non-router');
  const [deviceName, setDeviceName] = useState('');
  const [deviceNotes, setDeviceNotes] = useState('');
  const [deviceOS, setDeviceOS] = useState('');
  const [vendor, setVendor] = useState('');
  const [location, setLocation] = useState('');
  const [isShared, setIsShared] = useState(false); 
  useEffect(() => {
    setTimeout(() => {
      setApprovedDevices([
        {
          ip: '192.168.1.101',
          mac: 'AA:BB:CC:11:22:33',
          expiry: '2025-01-01T12:00:00Z',
          name: 'Work Laptop',
          type: 'non-router',
          os: 'Windows 11',
          vendor: 'Dell',
          location: 'Home Office',
          shared: false,
          notes: 'Primary work device'
        },
        {
          ip: '192.168.1.102',
          mac: 'DD:EE:FF:11:22:33',
          expiry: '2025-01-02T12:00:00Z',
          name: 'Phone',
          type: 'non-router',
          os: 'Android',
          vendor: 'Samsung',
          location: 'Mobile',
          shared: false
        }
      ]);
    }, 1000);
  }, []);

  const getExpiryDate = () => {
    const now = new Date();
    if (isShared) return now.toISOString();
    
    switch (expiryOption) {
      case '1h': return new Date(now.getTime() + (60 * 60 * 1000)).toISOString();
      case '1d': return new Date(now.getTime() + (24 * 60 * 60 * 1000)).toISOString();
      case '1m': return new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)).toISOString();
      case 'custom': return customExpiry;
      default: return new Date(now.getTime() + (60 * 60 * 1000)).toISOString();
    }
  };

  const handleApprove = async (custom = null) => {
    const expiry = custom || getExpiryDate();
    if (expiryOption === 'custom' && !customExpiry && !custom && !isShared) {
      alert('Please select a custom expiry date and time.');
      return;
    }

    setTimeout(() => {
      setApproved(true);
      setApprovedDevices([
        ...approvedDevices,
        {
          ip: clientInfo.ip,
          mac: clientInfo.mac,
          expiry,
          shared: isShared
        }
      ]);
    }, 500);
  };

  const fetchApprovedDevices = () => {
    // This would be a real fetch in a production app
  };

  const handleRevoke = async (mac, ip) => {
    setApprovedDevices(approvedDevices.filter(
      device => !(device.mac === mac && device.ip === ip)
    ));
    
    if (mac === clientInfo.mac && ip === clientInfo.ip) {
      setApproved(false);
    }
  };

  const fetchVendor = async (mac) => {
    if (!mac || mac.length < 8) return;
    setVendor(mac.startsWith('AA') ? 'Apple' : 'Intel');
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();

    if (!personalMac || !deviceName) {
      alert("Please fill all required fields.");
      return;
    }

    const expiry = new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toISOString();

    setTimeout(() => {
      setApprovedDevices([
        ...approvedDevices,
        {
          ip: 'Manual',
          mac: personalMac,
          name: deviceName,
          type: deviceType,
          os: deviceOS,
          vendor,
          location,
          shared: false,
          notes: deviceNotes,
          expiry,
          added_by_user: true
        }
      ]);
      
      setShowPersonalForm(false);
      setPersonalMac('');
      setDeviceName('');
      setDeviceType('non-router');
      setDeviceNotes('');
      setDeviceOS('');
      setVendor('');
      setLocation('');
    }, 500);
  };

  const formatDate = (dateString) => {
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
        <div className="flex justify-end mb-6">
          <button 
            className="px-4 py-2 bg-black text-white rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors"
            onClick={onLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Card */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 md:col-span-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col items-center mb-6">
              <img 
                src={user.picture} 
                alt="User Avatar" 
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow"
              />
              <h2 className="mt-4 text-xl font-bold text-black">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex items-start space-x-3">
                <Wifi className="text-gray-400 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm text-black">IP Address</p>
                  <p className="font-medium text-gray-500">{clientInfo.ip}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Cpu className="text-gray-400 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm text-black">MAC Address</p>
                  <p className="font-medium text-gray-500">{clientInfo.mac}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Internet Access Card */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 md:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4 text-black">Internet Access</h2>
            
            {!approved ? (
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <input
                    id="shared-device"
                    type="checkbox"
                    checked={isShared}
                    onChange={(e) => {
                      setIsShared(e.target.checked);
                      if (e.target.checked) {
                        setExpiryOption('1d');
                        setCustomExpiry('');
                      }
                    }}
                    className="h-4 w-4 text-black rounded border-gray-300 focus:ring-black"
                  />
                  <label htmlFor="shared-device" className="ml-2 block text-sm text-gray-700">
                    Shared / Public Device
                  </label>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                    Set Access Expiry:
                  </label>
                  <select
                    id="expiry"
                    value={expiryOption}
                    onChange={(e) => setExpiryOption(e.target.value)}
                    disabled={isShared}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                  >
                    <option value="1h">1 Hour</option>
                    <option value="1d">1 Day</option>
                    {!isShared && <option value="1m">1 Month</option>}
                    {!isShared && <option value="custom">Custom</option>}
                  </select>
                </div>
                
                {!isShared && expiryOption === 'custom' && (
                  <div className="space-y-2">
                    <label htmlFor="custom-expiry" className="block text-sm font-medium text-gray-700">
                      Custom Expiry Date and Time:
                    </label>
                    <input
                      id="custom-expiry"
                      type="datetime-local"
                      value={customExpiry}
                      onChange={(e) => setCustomExpiry(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button 
                    onClick={() => handleApprove()}
                    className="bg-black text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                  >
                    <Wifi size={18} />
                    <span>Approve Internet Access</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowPersonalForm(true)}
                    className="border border-black text-black py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <PlusCircle size={18} />
                    <span>Add Personal Device</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <Wifi className="text-green-500" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Internet Access Approved</h3>
                  <p className="text-green-600 text-sm">This device has been approved for internet access.</p>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Approved Devices */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 md:col-span-3 text-black"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-bold mb-6 text-black">Approved Devices</h2>
            
            {approvedDevices.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Monitor className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p>No devices approved yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {approvedDevices.map((device, i) => (
                  <motion.div 
                    key={`${device.mac}-${device.ip}`}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleRevoke(device.mac, device.ip)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Revoke Access"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <div className="rounded-full bg-gray-100 p-2 mr-3">
                        {device.type === 'router' ? (
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
                          {device.type || 'Unknown Type'} {device.shared && '(Shared)'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <p className="flex justify-between">
                        <span className="text-gray-500">IP:</span>
                        <span className="font-mono">{device.ip}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">MAC:</span>
                        <span className="font-mono">{device.mac}</span>
                      </p>
                      <p className="flex justify-between items-center">
                        <span className="text-gray-500 flex items-center">
                          <Clock size={14} className="mr-1" /> Expires:
                        </span>
                        <span className="text-xs">{formatDate(device.expiry)}</span>
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
                      
                      {device.notes && (
                        <p className="mt-2 text-gray-600 border-t border-gray-100 pt-2">
                          {device.notes}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
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
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b text-black">
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
                  <label htmlFor="mac" className="block text-sm font-medium text-gray-700 mb-1">
                    MAC Address:
                  </label>
                  <input
                    id="mac"
                    type="text"
                    value={personalMac}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPersonalMac(val);
                      fetchVendor(val);
                    }}
                    required
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="AA:BB:CC:DD:EE:FF"
                  />
                </div>
                
                <div>
                  <label htmlFor="device-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Device Name:
                  </label>
                  <input
                    id="device-name"
                    type="text"
                    value={deviceName}
                    onChange={e => setDeviceName(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="My Laptop"
                  />
                </div>
                
                <div>
                  <label htmlFor="device-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Device Type:
                  </label>
                  <select
                    id="device-type"
                    value={deviceType}
                    onChange={e => setDeviceType(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="non-router">Non-Router</option>
                    <option value="router">Router</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="device-os" className="block text-sm font-medium text-gray-700 mb-1">
                    Device OS:
                  </label>
                  <input
                    id="device-os"
                    type="text"
                    value={deviceOS}
                    onChange={e => setDeviceOS(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Windows, macOS, Android, etc."
                  />
                </div>
                
                <div>
                  <label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-1">
                    Vendor:
                  </label>
                  <input
                    id="vendor"
                    type="text"
                    value={vendor}
                    readOnly
                    className="w-full rounded-md border border-gray-300 py-2 px-3 bg-gray-50"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location / Room:
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Home Office, Living Room, etc."
                  />
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (optional):
                  </label>
                  <textarea
                    id="notes"
                    value={deviceNotes}
                    onChange={e => setDeviceNotes(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Additional information about this device..."
                  />
                </div>
                
                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors flex-grow"
                  >
                    Add Device
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPersonalForm(false)}
                    className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomePage;