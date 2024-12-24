import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { styled } from '@mui/material/styles';

const CustomDateCalendar = styled(DateCalendar)(({ theme }) => ({
  '& .MuiPickersDay-root': {
    '&:hover': {
      backgroundColor: '#c82333',
    },
  },
  '& .Mui-selected': {
    backgroundColor: '#c82333',
    '&:hover': {
      backgroundColor: '#c82333',
    },
  },
  //button
  '& .MuiButtonBase-root': {
    '&.Mui-selected': {
      backgroundColor: '#c82333',
      '&:hover': {
        backgroundColor: '#c82333',
      },
    },
  },
  '& .MuiButtonBase-root.MuiPackersDay-root': {
    '&.Mui-selected': {
      backgroundColor: '#c82333',
      '&:hover': {
        backgroundColor: '#c82333',
      },
    },
  },
}));

export default function Calender() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDateCalendar />
    </LocalizationProvider>
  );
}
