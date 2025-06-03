import React, { useEffect, useState } from 'react';
import { addHours, addDays, addMonths, addYears, formatISO } from 'date-fns';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [clientInfo, setClientInfo] = useState({ ip: '', mac: '' });
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
    fetch('http://localhost:5000/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.email) setUser(data);
        else window.location.href = '/';
      });

    fetch('http://localhost:5000/client-info', { credentials: 'include' })
      .then(res => res.json())
      .then((info) => {
        setClientInfo(info);
        fetch('http://localhost:5000/approved-devices', { credentials: 'include' })
          .then(res => res.json())
          .then((devices) => {
            setApprovedDevices(devices);
            const match = devices.find(
              (d) => d.mac === info.mac && d.ip === info.ip
            );
            if (match) setApproved(true);
          });
      });
  }, []);

  const getExpiryDate = () => {
    const now = new Date();
    if (isShared) return formatISO(addDays(now, 1));
    switch (expiryOption) {
      case '1h': return formatISO(addHours(now, 1));
      case '1d': return formatISO(addDays(now, 1));
      case '1m': return formatISO(addMonths(now, 1));
      case 'custom': return customExpiry;
      default: return formatISO(addHours(now, 1));
    }
  };

  const handleApprove = async (custom = null) => {
    const expiry = custom || getExpiryDate();
    if (expiryOption === 'custom' && !customExpiry && !custom && !isShared) {
      alert('Please select a custom expiry date and time.');
      return;
    }

    const res = await fetch('http://localhost:5000/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...clientInfo, expiry, shared: isShared }),
    });

    const data = await res.json();
    if (data.status === 'approved') {
      setApproved(true);
      fetchApprovedDevices();
    }
  };

  const fetchApprovedDevices = () => {
    fetch('http://localhost:5000/approved-devices', { credentials: 'include' })
      .then(res => res.json())
      .then(setApprovedDevices);
  };

  const handleRevoke = async (mac, ip) => {
    await fetch('http://localhost:5000/revoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ mac, ip }),
    });
    fetchApprovedDevices();
    if (mac === clientInfo.mac && ip === clientInfo.ip) {
      setApproved(false);
    }
  };

  const handleLogout = async () => {
    await fetch('http://localhost:5000/logout', {
      credentials: 'include',
    });
    window.location.href = '/';
  };

  const fetchVendor = async (mac) => {
    if (!mac || mac.length < 8) return;
    try {
      const response = await fetch(`http://localhost:5000/vendor-lookup?mac=${mac}`);
      const data = await response.json();
      setVendor(data.vendor || '');
    } catch (err) {
      console.error("Vendor lookup failed", err);
    }
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();

    if (!personalMac || !deviceName) {
      alert("Please fill all required fields.");
      return;
    }

    const expiry = formatISO(addYears(new Date(), 1));

    const res = await fetch('http://localhost:5000/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
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
        added_by_user: true,
      }),
    });

    const data = await res.json();
    if (data.status === 'approved') {
      setShowPersonalForm(false);
      setPersonalMac('');
      setDeviceName('');
      setDeviceType('non-router');
      setDeviceNotes('');
      setDeviceOS('');
      setVendor('');
      setLocation('');
      fetchApprovedDevices();
    }
  };

  if (!user) return null;

  return (
    <>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <div className="dashboard">
        <div className="home-card">
          <img src={user.picture} alt="Avatar" className="avatar" />
          <h2>Welcome, {user.name}</h2>
          <p>{user.email}</p>
          <hr style={{ margin: '1rem 0' }} />
          <p><strong>IP Address:</strong> {clientInfo.ip}</p>
          <p><strong>MAC Address:</strong> {clientInfo.mac}</p>

          {!approved && (
            <>
              <label style={{ display: 'block', marginBottom: '1rem' }}>
                <input
                  type="checkbox"
                  checked={isShared}
                  onChange={(e) => {
                    setIsShared(e.target.checked);
                    if (e.target.checked) {
                      setExpiryOption('1d');
                      setCustomExpiry('');
                    }
                  }}
                /> Shared / Public Device
              </label>

              <label>Set Access Expiry:</label>
              <select
                value={expiryOption}
                onChange={(e) => setExpiryOption(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '6px', width: '100%', marginBottom: '1rem' }}
                disabled={isShared}
              >
                <option value="1h">1 Hour</option>
                <option value="1d">1 Day</option>
                {!isShared && <option value="1m">1 Month</option>}
                {!isShared && <option value="custom">Custom</option>}
              </select>

              {!isShared && expiryOption === 'custom' && (
                <input
                  type="datetime-local"
                  value={customExpiry}
                  onChange={(e) => setCustomExpiry(e.target.value)}
                  style={{ marginBottom: '1rem', padding: '0.5rem', borderRadius: '6px', width: '100%' }}
                />
              )}

              <button className="approve-btn" onClick={() => handleApprove()}>
                Approve Internet Access
              </button>

              <button className="personal-btn" onClick={() => setShowPersonalForm(true)}>
                Add Personal Device
              </button>
            </>
          )}

          {approved && (
            <p style={{ marginTop: '1rem', color: '#4ade80' }}>
              ✅ Internet access already approved for this device.
            </p>
          )}
        </div>

        <div className="device-list-card">
          <h3>Approved Devices</h3>
          {approvedDevices.length === 0 ? (
            <p>No devices approved yet.</p>
          ) : (
            approvedDevices.map((device, i) => (
              <div key={i} className="device-entry">
                <p><strong>IP:</strong> {device.ip}</p>
                <p><strong>MAC:</strong> {device.mac}</p>
                <p><strong>Expires:</strong> {device.expiry}</p>
                {device.name && <p><strong>Name:</strong> {device.name}</p>}
                {device.type && <p><strong>Type:</strong> {device.type}</p>}
                {device.os && <p><strong>OS:</strong> {device.os}</p>}
                {device.vendor && <p><strong>Vendor:</strong> {device.vendor}</p>}
                {device.location && <p><strong>Location:</strong> {device.location}</p>}
                {device.shared && <p><strong>Shared:</strong> Yes</p>}
                {device.notes && <p><strong>Notes:</strong> {device.notes}</p>}
                <button onClick={() => handleRevoke(device.mac, device.ip)}>Revoke</button>
              </div>
            ))
          )}
        </div>
      </div>

      {showPersonalForm && (
        <div className="form-overlay">
          <form className="personal-form" onSubmit={handlePersonalSubmit}>
            <h3>Add Personal Device</h3>

            <label>MAC Address:</label>
            <input
              type="text"
              value={personalMac}
              onChange={(e) => {
                const val = e.target.value;
                setPersonalMac(val);
                fetchVendor(val);
              }}
              required
            />

            <label>Device Name:</label>
            <input type="text" value={deviceName} onChange={e => setDeviceName(e.target.value)} required />

            <label>Device Type:</label>
            <select value={deviceType} onChange={e => setDeviceType(e.target.value)} required>
              <option value="non-router">Non-Router</option>
              <option value="router">Router</option>
            </select>

            <label>Device OS:</label>
            <input type="text" value={deviceOS} onChange={e => setDeviceOS(e.target.value)} />

            <label>Vendor:</label>
            <input type="text" value={vendor} readOnly />

            <label>Location / Room:</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} />

            <label>Notes (optional):</label>
            <textarea value={deviceNotes} onChange={e => setDeviceNotes(e.target.value)} rows={3} />

            <div style={{ marginTop: '1rem' }}>
              <button type="submit" className="approve-btn">Add Device</button>
              <button type="button" className="logout-btn" onClick={() => setShowPersonalForm(false)} style={{ marginLeft: '1rem', background: '#555' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default HomePage;