// // src/EmployeeList.jsx
// import React from "react";

// const EmployeeList = ({ employees }) => {
//   return (
//     <div>
//       <h2>Employee List</h2>
//       {employees.length === 0 ? (
//         <p>No employees found</p>
//       ) : (
//         <ul>
//           {employees.map((employee) => (
//             <li key={employee.id}>
//               <strong>Name:</strong> {employee.name} <br />
//               <strong>Role:</strong> {employee.role} <br />
//               <strong>Department:</strong> {employee.department} <br />
//               <strong>Email:</strong> {employee.email} <br />
//               <strong>Phone:</strong> {employee.phone} <br />
//               <strong>Date of Joining:</strong> {employee.dateOfJoining} <br />
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

export default EmployeeList;
