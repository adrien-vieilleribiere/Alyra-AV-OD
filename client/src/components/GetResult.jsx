import useEth from "./../contexts/EthContext/useEth";

function GetResult() {
  const { state: { contract, accounts, proposals } } = useEth();
  console.log(proposals);
  return (
    <p>TODO</p>
  );
}
export default GetResult;
