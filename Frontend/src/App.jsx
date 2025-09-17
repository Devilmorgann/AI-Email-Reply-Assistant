import {Container,Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Input } from 'postcss';
import React, { useState } from 'react'


const App = () => {


const handleSubmit =  async ()=>{
 setloading(true);
 seterror(' ');

 try {

  const response = await axios.post("http://localhost:8080/api/email/generate" , {
    emailContent,
    tone

  });
  
  setgeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));

 } catch (error) {
  seterror("Cant create the reply !..Plz try again");
  console.log(error)
 }
 finally{
  setloading(false);
 }
}

const[emailContent,setemailContent] = useState('');
const[tone,settone] = useState('');
const[generatedReply,setgeneratedReply] = useState('');
const[loading,setloading] = useState(false);
const[error,seterror] = useState('');

  return (
      <div className='content '>
     <Container maxWidth="md" sx={{py:4, mt:12, border:'2px solid black'}}  >
     <Typography variant="h3" component="h1" gutterBottom align='center' sx={{fontFamily:'roboto'}}>
       Email Reply Assistant
     </Typography>
    

    <Box  sx={{ mx:3 }}>
      <TextField fullWidth multiline 
      rows={6} label='Original Email Component'
      variant='outlined' value={emailContent || ' '} 
      onChange={(e) =>{
        setemailContent(e.target.value)
      }} sx={{mb:2}}  />
   

    <FormControl fullWidth sx={{mb:2}}>
      <InputLabel>Tone(Optional)</InputLabel>
      <Select
      value={tone||''}
      label={"Tone (Optional)"}
      onChange={(e)=>{
        settone(e.target.value)
      }}
       >
        <MenuItem value=''>None</MenuItem>
        <MenuItem value='professional'>Professional</MenuItem>
        <MenuItem value='casual'>Casual</MenuItem>
        <MenuItem value='friendly'>Friendly</MenuItem>
        <MenuItem value='diplomatically'>Diplomitically</MenuItem>

      </Select>
    </FormControl>

    <Button
    variant='contained'
    onClick={handleSubmit}
   // disabled = {!emailContent || loading}
    fullWidth
    sx={{
    backgroundColor: '#6a0dad', // brinjal purple
    '&:hover': {
      backgroundColor: '#5a009d' // darker shade for hover
    }
  }}
    >
      {loading? <CircularProgress size={24}/> : "Generate Reply"}
    </Button>
    
     </Box>
     {error && (
           <Typography color='error'  align='center' sx={{mb:2,mt:3}}>
         {error}
     </Typography>
     )}

     {generatedReply && (
      <Box sx={{mt:3}}>
       <Typography variant='h6' gutterBottom>
         Generated Reply : 
       </Typography>
       <TextField
       fullWidth multiline rows={6}
       variant='outlined' value={generatedReply || " "}
       inputProps={{readOnly : true}}
       />
       <Button
      variant='outlined'
      sx={{mt:3}}
      onClick={navigator.clipboard.writeText(generatedReply)}
       >Copy to Clipboard </Button>
      </Box>
     )}
    </Container>
  </div>

  )
}

export default App