import { TabPanel } from '@mui/lab';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Divider
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web';

import Stats from "../Stats";


function InfosTab() {
  return (
    <TabPanel value="info" key="info">

      <Stats />

      <Box
        mt={2}
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
      >
        <Typography variant="h6" component="h3">
          Voting Dapp
        </Typography>
        <Typography variant="subtitle1">
          by Adrien Vieilleribiere &amp; Olivier David for Alyra
        </Typography>

        <List>
          <Box sx={{ display: 'inline-flex' }}>
            <ListItem
              component={Link}
              href="https://alyra-av-od-adrien-vieilleribiere.vercel.app/"
              children="Deployed demo"
            >
              <ListItemIcon>
                <WebIcon />
              </ListItemIcon>
              <ListItemText primary="Deployed demo" />
            </ListItem>
          </Box>
          <Divider />
          <Box sx={{ display: 'inline-flex' }}>
            <ListItem
              component={Link}
              href="https://github.com/adrien-vieilleribiere/Alyra-AV-OD"
              children="Github Repository"
            >
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary="Github Repository" />
            </ListItem>
          </Box>
        </List>
      </Box >

    </TabPanel >
  );
}

export default InfosTab;
