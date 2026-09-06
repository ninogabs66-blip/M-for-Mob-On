const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'app_db.json');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initial DB structure
const initialData = {
  users: [],
  drivers: [],
};

// Load database from file
function loadDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading database file:', error);
    return initialData;
  }
}

// Save database to file atomically
function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
}

// Database helper operations
const db = {
  // Find a user by email
  findUserByEmail(email) {
    if (!email) return null;
    const data = loadDb();
    return data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  // Find a user by Google ID
  findUserByGoogleId(googleId) {
    if (!googleId) return null;
    const data = loadDb();
    return data.users.find(u => u.googleId === googleId);
  },

  // Find a driver by email or contact info / phone
  findDriver(emailOrPhone) {
    if (!emailOrPhone) return null;
    const query = emailOrPhone.trim().toLowerCase();
    const data = loadDb();
    return data.drivers.find(d => 
      (d.email && d.email.toLowerCase() === query) ||
      (d.contactInfo && d.contactInfo.replace(/\s+/g, '') === query.replace(/\s+/g, ''))
    );
  },

  // Create or register a passenger user
  createUser({ name, email, password, googleId = null, role = 'passenger', avatar = null }) {
    const data = loadDb();
    const newUser = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name,
      email: email.toLowerCase(),
      password: password || null,
      googleId,
      role,
      avatar,
      createdAt: new Date().toISOString(),
    };
    data.users.push(newUser);
    saveDb(data);
    return newUser;
  },

  // Create or register a driver
  createDriver({ name, midName, lastName, contactInfo, birthdate, license, email, password, googleId = null }) {
    const data = loadDb();
    
    // Also create user record for auth consistency
    const userId = 'usr_drv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const newDriverUser = {
      id: userId,
      name: `${name} ${lastName}`.trim(),
      email: email ? email.toLowerCase() : '',
      password: password || null,
      googleId,
      role: 'driver',
      createdAt: new Date().toISOString(),
    };
    data.users.push(newDriverUser);

    const newDriver = {
      id: 'drv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      userId,
      firstName: name,
      midName: midName || '',
      lastName: lastName,
      fullName: `${name} ${midName ? midName + ' ' : ''}${lastName}`.trim(),
      contactInfo,
      birthdate,
      licenseCopy: license || 'drivers_license_front.jpg',
      email: email ? email.toLowerCase() : '',
      password: password || null,
      status: 'approved',
      createdAt: new Date().toISOString(),
    };
    data.drivers.push(newDriver);

    saveDb(data);
    return newDriver;
  },

  // List all users
  getAllUsers() {
    return loadDb().users;
  },

  // List all drivers
  getAllDrivers() {
    return loadDb().drivers;
  }
};

module.exports = db;
