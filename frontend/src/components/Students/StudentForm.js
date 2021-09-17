import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material'

const initialState = {
  name:'',
  address:''
}

export default function StudentForm() {
  const paperStyle = {padding:'50px 20px', width:600, margin:'20px auto'};
  const [formData, setFormData ] = React.useState(initialState);
  const [students, setStudents] = React.useState([])


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  React.useEffect(() => {
    fetch('http://localhost:8080/student/getAll')
    .then(res => res.json())
    .then(result => setStudents(result))
  },[])

  const onSubmit = (e) => {
    e.preventDefault(e);
    console.log(formData);
    fetch("http://localhost:8080/student/add", {
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
    })
    .then(() => console.log("Student Submitted"))
    .then(() => setFormData(initialState))
  }

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h3><u>Add Student</u></h3>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" name="name" value={formData.name} onChange={(e) => handleChange(e)} label="Student Name" variant="outlined" fullWidth/>
          <TextField id="outlined-basic" name="address" value={formData.address} onChange={(e) => handleChange(e)} label="Student Address" variant="outlined" fullWidth/>
        </Box>
        {/* {formData.name} */}
        <Button onClick={onSubmit} variant="contained" color="success">Submit</Button>
      </Paper>
      <Paper>
        <ul style={{listStyle:'none'}}>
        {
          students.length && students.map((student) => <li key={student.id}>{student.name}</li>)
        }
        </ul>
      </Paper>
    </Container>
  );
}

