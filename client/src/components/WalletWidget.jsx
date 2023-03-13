import {
    Chip,
  } from '@mui/material';
  import ContentCopyIcon from '@mui/icons-material/ContentCopy';
  import Blockies from 'react-blockies';
  
  import { ethAddrShortener } from '../helper/eth-addr-shortener';
  
  
  function WalletWidget({ address }) {
    const addrShort = ethAddrShortener(address);
    const onCopyClick = () => {
      navigator.clipboard.writeText(address)
    }
  
    return (
      <>
        <Chip
          sx={{ color: "white", height: "2.7em", fontSize: "0.85em" }}
          avatar={
              /* Adress identicon */
              <Blockies
                className="blockies"
                seed={address}
                size={9}
                scale={3}
              />
          }
          label={addrShort}
          /* Adress copy button using chip delete icon */
          deleteIcon={
            <ContentCopyIcon />
          }
          onDelete={onCopyClick}
        />
      </>
    );
  };
  
  export default WalletWidget;