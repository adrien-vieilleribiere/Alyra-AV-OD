import {
  Box,
} from '@mui/material';

import StepsTimeline from './StepsTimeline';
import StepIncrementer from './StepIncrementer';

function Timeline() {
  return (
    <>
      <Box
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px', background: 'var(--mid-gray)' }}
      >
        <StepsTimeline />
        <Box textAlign='center' sx={{ flexGrow: 1, marginTop: 1 }}>
          {/* <StepIncrementer step={step} /> */}
          <StepIncrementer />
        </Box>
      </Box>
    </>
  )

};

export default Timeline;