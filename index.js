const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let students = [];
let nextId = 1;

app.get('/students', (req, res) => {
  return res.status(200).json({
    success: true,
    data: students
  });
});

app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found.`
    });
  }

  return res.status(200).json({
    success: true,
    data: student
  });
});

app.post('/students', (req, res) => {
  const { name, usn, age, dob, department, year, hobbies } = req.body;

  if (!name || !usn || !age || !dob || !department || !year) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields: name, usn, age, dob, department, year.'
    });
  }

  const newStudent = {
    id: nextId++,
    name,
    usn,
    age,
    dob,
    department,
    year,
    hobbies: hobbies || []
  };

  students.push(newStudent);

  return res.status(201).json({
    success: true,
    message: 'Student added successfully.',
    data: newStudent
  });
});

app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found.`
    });
  }

  const { name, usn, age, dob, department, year, hobbies } = req.body;

  students[studentIndex] = {
    ...students[studentIndex],
    name: name ?? students[studentIndex].name,
    usn: usn ?? students[studentIndex].usn,
    age: age ?? students[studentIndex].age,
    dob: dob ?? students[studentIndex].dob,
    department: department ?? students[studentIndex].department,
    year: year ?? students[studentIndex].year,
    hobbies: hobbies ?? students[studentIndex].hobbies
  };

  return res.status(200).json({
    success: true,
    message: 'Student updated successfully.',
    data: students[studentIndex]
  });
});

app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found.`
    });
  }

  const deletedStudent = students.splice(studentIndex, 1);

  return res.status(200).json({
    success: true,
    message: `Student with ID ${studentId} deleted successfully.`,
    data: deletedStudent[0]
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});