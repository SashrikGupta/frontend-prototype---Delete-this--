import * as React from 'react';
import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';
import Card from "@mui/material/Card";
import AppTasks from './app-tasks';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const textStyle = {
  background: 'linear-gradient(45deg, pink ,  violet,violet  , aqua ,aqua , aqua,aqua ,aqua , aqua , aqua )',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
};
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function Event() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [newEventDate, setNewEventDate] = useState(null);
  const [newEventDescription, setNewEventDescription] = useState('');
  const today = new Date();

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    if (selectedDate) {
      const day = selectedDate.$d.getDate();
      const month = selectedDate.$d.getMonth() + 1; // Month is 0-indexed
      const year = selectedDate.$d.getFullYear();
      setDate(`${day}/${month}/${year}`);
    }
  }, [selectedDate]);

  useEffect(() => {
    console.log(date);
  }, [date]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log(`New Event - Date: ${newEventDate}, Description: ${newEventDescription}`);
    // Add your logic to save the new event
    setOpen(false);
  };

  return (
    <>
      <div className='flex flex-col justify-between h-[88vh]'>
        <div className='flex w-[80vw] mx-auto justify-around'>
          <Card className="overflow-y-scroll items-center w-[300px] h-[350px]" style={{ background: "linear-gradient(45deg, aqua, violet, pink)" }}>
            <div className='mt-[5px]'>
              <LocalizationProvider dateAdapter={AdapterDayjs} className="text-white">
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  className='text-white backdrop-blur-2xl bg-white/10 shadow-xl rounded-lg'
                  sx={{
                    width: "calc(300px - 10px)",
                    height: "calc(350px - 10px)",
                    overflow: "scroll"
                  }}
                />
              </LocalizationProvider>
            </div>
          </Card>

          <div className="flex h-[350px] flex-col justify-between">
            <Card className="h-[155px] p-4" style={{ width: "calc(78vw - 300px)" }}>
              <div className='font-bold text-[55px]' style={textStyle}>{selectedDate ? days[selectedDate.$d.getDay()] : days[today.getDay()]}</div>
              <div className='text-[20px] pl-2 text-[gray]'>
                {
                  selectedDate ?
                    `
                    ${selectedDate.$d.getDate()} ${months[selectedDate.$d.getMonth()]}  ${selectedDate.$d.getFullYear()}
                    `
                    :
                    `
                    ${today.getDate()} ${months[today.getMonth()]}  ${today.getFullYear()}
                    `
                }
              </div>
            </Card>
            <Card className='h-[80px] p-4'>
              <div className="text-[28px] text-[gray]"> total task    &nbsp;   <span className="text-[gray]">10</span></div>
            </Card>
            <Card className='h-[80px] p-4'>
              <div className="text-[28px] text-[gray]"> remaining task &nbsp;  <span className="text-[gray]">6</span></div>
            </Card>
          </div>
        </div>

        <AppTasks
          title={<div className='w-[76vw] flex justify-between'>
            Task
            <Button variant='contained' onClick={handleClickOpen}>
              + Tasks
            </Button>
          </div>}
          list={[
            { id: '1', name: 'Create FireStone Logo' },
            { id: '2', name: 'Add SCSS and JS files if required' },
            { id: '3', name: 'Stakeholder Meeting' },
            { id: '4', name: 'Scoping & Estimations' },
            { id: '5', name: 'Sprint Showcase' },
            { id: '6', name: 'Create FireStone Logo' },
            { id: '7', name: 'Add SCSS and JS files if required' },
            { id: '8', name: 'Stakeholder Meeting' },
            { id: '9', name: 'Scoping & Estimations' },
            { id: '10', name: 'Sprint Showcase' },
          ]}
          className='w-[80vw] mx-auto'
          style={{ height: "calc(86vh - 350px)", overflow: "scroll" }}
        />

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={newEventDate}
                onChange={(newValue) => setNewEventDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={newEventDescription}
              onChange={(e) => setNewEventDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default Event;
