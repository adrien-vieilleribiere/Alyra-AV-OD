import React, { useState } from 'react';
import PropTypes from 'prop-types'

import {
	Box,
	TextField,
	Button,
	Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


function MainOwner({step}) {

	return (
		<>
			<h2>Main Owner component</h2>
			{/* Button for changing step or in header ? */}
			{/* Controls to perform:
            - one voter at least
            - one proposal at least
            - one vote at least
            => to be discusssed
        */}
			{/* Conditionnal display depending on the current status */}
			{/* Voter list limited height with scroller */}
			<>
				<h3>Voters already registered</h3>
				<>Registered voters list or not yet</>
			</>

			{/* register voter */}
			{step < 1 &&
				<>
					<Divider sx={{ my:2 }}/>
					<h3>Add a voter</h3>
					<Box sx={{
						display: 'flex',
						alignItems: 'center',
						'& > :not(style)': { m: 1 },
					}}>
						<TextField fullWidth id="addVoterAddress" label="Address to add" variant="filled" />
						<Button variant="contained">
							<AddIcon></AddIcon>
						</Button>
					</Box>
				</>

			}
			{/* proposal registration started */}
			{step > 0 &&
				<>
					<Divider sx={{ my:2 }}/>
					<h3>Proposals registered</h3>
					<>Registered proposals list</>
				</>

			}
			{/* vote session started */}
			{step > 2 &&
				<>
					<Divider sx={{ my:2 }}/>
					<h3>Numbers of votes</h3>
					<>number of votes only</>
				</>
			}
			{/* votes tallied */}
			{step > 2 &&
				<>
					<Divider sx={{ my:2 }}/>
					<h3>Result</h3>
					<>Recap number of votes detailled</>
				</>
			}
		</>
	);
}

MainOwner.propTypes = {
	step: PropTypes.number.isRequired
};

export default MainOwner;
