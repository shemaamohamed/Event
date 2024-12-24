import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { users, valueFormatter } from './Datauser';
import { Paper } from '@mui/material';

export default function PieActiveArc() {
  const [chartSize, setChartSize] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setChartSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getOuterRadius = () => {
    if (chartSize >= 1200) return 100;
    if (chartSize >= 768) return 90;  
    return 60; 
  };

  return (
    <Paper sx={{ padding: 2 }}>
    <PieChart
      colors={['#2c3e50', '#c82333', '#ecf0f1', '#16a085', '#f39c12']}
      series={[
        {
          data: users,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 20, additionalRadius: -20, color: 'gray' },
          outerRadius: getOuterRadius(),
          valueFormatter,
        },
      ]}
      height={200} 
    />
    </Paper>
  );
}
