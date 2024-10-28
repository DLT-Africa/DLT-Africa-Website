import React from 'react';

const Page = () => {
  const students = [
    { name: 'Alice Johnson', stateOfOrigin: 'Kwara State', email: 'alice@example.com', phone: '09044223355', gender: 'Female' },
    { name: 'Bob Smith', stateOfOrigin: 'Ogun State', email: 'bob@example.com', phone: '09044223355', gender: 'Male' },
    { name: 'Ali Anate', stateOfOrigin: 'Lagos State', email: 'aliu@example.com', phone: '09044223355', gender: 'Female' },
    { name: 'David Brown', stateOfOrigin: 'Osun State', email: 'david@example.com', phone: '09044223355', gender: 'Male' },
    { name: 'Eve Black', stateOfOrigin: 'Oyo State', email: 'eve@example.com', phone: '09044223355', gender: 'Female' }
  ];

  return (
    <div>
      <h2>Student Registration Data</h2>
      {students.map((student, index) => (
        <div key={index}>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>State of Origin:</strong> {student.stateOfOrigin}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone No:</strong> {student.phone}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Page;
