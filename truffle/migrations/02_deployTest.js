const Voting = artifacts.require("Voting");

module.exports = async function (deployer) {
    await deployer.deploy(Voting);
    let _vi = await Voting.deployed();
    //console.log(voting);
    let accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    console.log(accounts);
    const voter1 = accounts[1];
    const voter2 = accounts[2];
    const voter3 = accounts[3];
    await _vi.addVoter(owner, { from: owner });
    await _vi.addVoter(voter1, { from: owner });
    await _vi.addVoter(voter2, { from: owner });
    await _vi.addVoter(voter3, { from: owner });
    await _vi.startProposalsRegistering({ from: owner });
    await _vi.addProposal("proposalVoter1", { from: voter1 });
    await _vi.addProposal("proposalVoter2", { from: voter2 });
    await _vi.addProposal("proposalVoter3", { from: voter3 });
    await _vi.endProposalsRegistering({ from: owner });
    await _vi.startVotingSession({ from: owner })
    await _vi.setVote(1, { from: voter1 });
    await _vi.setVote(2, { from: voter2 });
    await _vi.setVote(2, { from: voter3 });




};