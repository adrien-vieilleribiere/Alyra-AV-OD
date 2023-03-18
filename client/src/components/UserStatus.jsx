import { useEffect } from "react";
import useEth from "./../contexts/EthContext/useEth";

function UserStatus() {
  const {
    state: { accounts, owner, voters }, actions, dispatch
  } = useEth();

  /* User connection and role management */
  useEffect(() => {
    const getUserInfo = () => {
      const user = {
        isConnected: false,
        isOwner: false,
        isVoter: false,
      };
      // isConnected ?
      if (accounts && accounts.length !== 0) {
        user.isConnected = true;
        // isOwner ?
        if (accounts[0] === owner) {
          user.isOwner = true;
        }
        // isVoter ?
        const voter = voters.filter((voter) =>
          voter.address === accounts[0]
        )
        if (voter.length !== 0) {
          user.isVoter = true;
        }
      }
      dispatch({
        type: actions.updateUserInfo,
        data: user,
      });
    };

    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, owner, voters]);

};

export default UserStatus;