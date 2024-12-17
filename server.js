// dependencies
const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employee');

// instance
const app = express();

app.use(cors());
app.use(express.json());// put and post requests

app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
