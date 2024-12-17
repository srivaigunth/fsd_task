const express = require('express');
const db = require('../db'); 
const router = express.Router(); 

//get data
router.post('/', async (req, res) => {
  const { name, employeeId, email, phone, department, dateOfJoining, role } = req.body;
  console.log(req.body);

  try {//check for duplicate
    const [existingEmployee] = await db.query(
      'SELECT * FROM employees WHERE employee_id = ? OR email = ?',
      [employeeId, email]
    );

    if (existingEmployee.length > 0) {//if duplicate... return this
      return res.status(400).json({ message: 'Employee ID or Email already exists' });
    }

    await db.query(//else add it to table
      'INSERT INTO employees (name, employee_id, email, phone, department, date_of_joining, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, employeeId, email, phone, department, dateOfJoining, role]
    );
    
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    console.error('Error while adding employee:', error);
    res.status(500).json({ message: 'Error adding employee', error: error.message });
  }
});

module.exports = router; 
