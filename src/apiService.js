const API_URL = 'http://localhost:5000/api/employees';
export const fetchEmployees = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error; 
  }
};
export const addEmployee = async (employee) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });

    if (!response.ok) {
      throw new Error('Failed to add employee');
    }

    const data = await response.json();
    return { success: true, data };  
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;  
  }
};
