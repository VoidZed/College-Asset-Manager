import React, { useState } from 'react';
import { Button, Tooltip, CircularProgress, IconButton, Stack } from '@mui/material';

import QueryStatsIcon from '@mui/icons-material/QueryStats';
import axios from 'axios';

function AnalyticsPdfButton({ activities, selectedYear, activity_name, redirect }) {
  const [loading, setLoading] = useState(false);

  const handleGeneratePDF = async () => {

    setLoading(true); // Start loading

    if (redirect()) return;
    try {
      console.log('Generating PDF...');

      const response = await axios.post(
        '/api/generate_activity_pdf',
        { activities, selectedYear, activity_name },
        { responseType: 'blob', withCredentials: true }
      );

      // Create and trigger the download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `activity_analytics_${activity_name}_${selectedYear}.pdf`);

      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log('PDF generated successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Tooltip title="Generate Analytics PDF">

      <IconButton
        variant="contained"
        color="primary"
        onClick={handleGeneratePDF}
        disabled={loading} // Disable button when loading

      >
        {loading ? <CircularProgress size={20} color="inherit" /> : <QueryStatsIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default AnalyticsPdfButton;
