const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for mobile & web requests
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running healthy', timestamp: new Date() });
});

// Passenger Registration
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const user = db.createUser({ name, email, password, role: 'passenger' });
    console.log('Registered new passenger:', user.email);

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Error during passenger registration:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Passenger Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'Account not found. Please register first.' });
    }

    if (user.password && user.password !== password) {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    console.log('Passenger logged in:', user.email);
    res.json({
      success: true,
      message: 'Logged in successfully!',
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Driver Registration
app.post('/api/auth/driver-register', (req, res) => {
  try {
    const { name, midName, lastName, contactInfo, birthdate, license, email, password } = req.body;

    if (!name || !lastName || !contactInfo || !email || !password) {
      return res.status(400).json({ error: 'Name, Last Name, Contact Info, Email, and Password are required.' });
    }

    const existingDriver = db.findDriver(email) || db.findDriver(contactInfo);
    if (existingDriver) {
      return res.status(409).json({ error: 'A driver account with this email or contact info already exists.' });
    }

    const driver = db.createDriver({
      name,
      midName,
      lastName,
      contactInfo,
      birthdate,
      license: license || 'drivers_license_front.jpg',
      email,
      password
    });

    console.log('Registered new driver:', driver.fullName, driver.contactInfo);
    res.status(201).json({
      success: true,
      message: 'Driver registered successfully!',
      driver: {
        id: driver.id,
        fullName: driver.fullName,
        email: driver.email,
        contactInfo: driver.contactInfo,
        status: driver.status
      }
    });
  } catch (err) {
    console.error('Error during driver registration:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Driver Login
app.post('/api/auth/driver-login', (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ error: 'Driver email/phone and password are required.' });
    }

    const driver = db.findDriver(emailOrPhone);
    if (!driver) {
      return res.status(404).json({ error: 'Driver account not found. Please register as driver first.' });
    }

    if (driver.password && driver.password !== password) {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    console.log('Driver logged in:', driver.fullName);
    res.json({
      success: true,
      message: 'Driver logged in successfully!',
      driver: {
        id: driver.id,
        fullName: driver.fullName,
        email: driver.email,
        contactInfo: driver.contactInfo,
        status: driver.status
      }
    });
  } catch (err) {
    console.error('Error during driver login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Google Authentication (Passenger or Driver)
app.post('/api/auth/google', (req, res) => {
  try {
    const { googleId, email, name, avatar, role = 'passenger' } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Google email is required.' });
    }

    let user = db.findUserByGoogleId(googleId) || db.findUserByEmail(email);

    if (!user) {
      // Auto-provision new user account via Google
      user = db.createUser({
        name: name || 'Google User',
        email,
        googleId,
        avatar,
        role: role || 'passenger'
      });
      console.log(`Created new ${role} via Google:`, user.email);
    } else {
      console.log(`Existing ${user.role} logged in with Google:`, user.email);
    }

    res.json({
      success: true,
      message: `Signed in with Google as ${user.name}!`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Error during Google authentication:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Inspect users & drivers (for development)
app.get('/api/users', (req, res) => res.json(db.getAllUsers()));
app.get('/api/drivers', (req, res) => res.json(db.getAllDrivers()));

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`========================================`);
  console.log(`🚀 MJYA API Server running on port ${PORT}`);
  console.log(`   Local URL:   http://localhost:${PORT}`);
  console.log(`   Network URL: http://0.0.0.0:${PORT}`);
  console.log(`========================================`);
});
