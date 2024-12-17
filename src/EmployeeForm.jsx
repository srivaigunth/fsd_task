import React, { useState, useEffect } from "react";
import "./EmployeeForm.css";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const departments = ["HR", "Engineering", "Marketing"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Clear previous success messages and errors
    setSuccessMessage("");
    setErrors({});
    setIsLoading(true);

    const employee = { name, employeeId, email, phone, department, dateOfJoining, role };

    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        setSuccessMessage("Employee added successfully!");
        resetForm();
      } else {
        const errorData = await response.json();
        setErrors({ api: errorData.message });
      }
    } catch (error) {
      setErrors({ api: "Failed to add employee. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const formErrors = {};

    if (!name) formErrors.name = "Name is required.";

    if (!employeeId) formErrors.employeeId = "Employee ID is required.";
    else if (employeeId.length > 10) formErrors.employeeId = "Employee ID must be 10 characters or less.";

    if (!email) formErrors.email = "Email is required.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      formErrors.email = "Invalid email address.";
    }

    if (!phone) formErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(phone)) {
      formErrors.phone = "Phone number must be 10 digits.";
    }

    if (!department) formErrors.department = "Department is required.";

    if (!dateOfJoining) formErrors.dateOfJoining = "Date of joining is required.";
    else if (new Date(dateOfJoining) > new Date()) formErrors.dateOfJoining = "Date of joining cannot be a future date.";

    if (!role) formErrors.role = "Role is required.";

    return formErrors;
  };

  const resetForm = () => {
    setName("");
    setEmployeeId("");
    setEmail("");
    setPhone("");
    setDepartment("");
    setDateOfJoining("");
    setRole("");
  };

  // clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="form-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="form-element">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First and Last Name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Employee ID Field */}
        <div className="form-element">
          <label>Employee ID:</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="e.g., EMP001"
          />
          {errors.employeeId && <span className="error">{errors.employeeId}</span>}
        </div>

        {/* Email Field */}
        <div className="form-element">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g., example@example.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Phone Number Field */}
        <div className="form-element">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g., 1234567890"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        {/* Department Field */}
        <div className="form-element">
          <label>Department:</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
          {errors.department && <span className="error">{errors.department}</span>}
        </div>

        {/* Date of Joining Field */}
        <div className="form-element">
          <label>Date of Joining:</label>
          <input
            type="date"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
          />
          {errors.dateOfJoining && <span className="error">{errors.dateOfJoining}</span>}
        </div>

        {/* Role Field */}
        <div className="form-element">
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Developer"
          />
          {errors.role && <span className="error">{errors.role}</span>}
        </div>

        {/* Submit and Reset Buttons */}
        <div className="form-element">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button type="button" className="reset-btn" onClick={resetForm} disabled={isLoading}>
            Reset
          </button>
        </div>
      </form>

      {/* Success or Error Message */}
      {successMessage && <div className="success">{successMessage}</div>}
      {errors.api && <div className="error">{errors.api}</div>}
    </div>
  );
};

export default EmployeeForm;
