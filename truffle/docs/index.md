# Solidity API

## Voting

### winningProposalID

```solidity
uint256 winningProposalID
```

_the id of the proposal which obtained the maximal number of votes_

### Voter

```solidity
struct Voter {
  bool isRegistered;
  bool hasVoted;
  uint256 votedProposalId;
}
```

### Proposal

```solidity
struct Proposal {
  string description;
  uint256 voteCount;
}
```

### WorkflowStatus

```solidity
enum WorkflowStatus {
  RegisteringVoters,
  ProposalsRegistrationStarted,
  ProposalsRegistrationEnded,
  VotingSessionStarted,
  VotingSessionEnded,
  VotesTallied
}
```

### workflowStatus

```solidity
enum Voting.WorkflowStatus workflowStatus
```

### proposalsArray

```solidity
struct Voting.Proposal[] proposalsArray
```

### voters

```solidity
mapping(address => struct Voting.Voter) voters
```

### VoterRegistered

```solidity
event VoterRegistered(address voterAddress)
```

### WorkflowStatusChange

```solidity
event WorkflowStatusChange(enum Voting.WorkflowStatus previousStatus, enum Voting.WorkflowStatus newStatus)
```

### ProposalRegistered

```solidity
event ProposalRegistered(uint256 proposalId)
```

### Voted

```solidity
event Voted(address voter, uint256 proposalId)
```

### onlyVoters

```solidity
modifier onlyVoters()
```

### getVoter

```solidity
function getVoter(address _addr) external view returns (struct Voting.Voter)
```

_Get a voter from its address._

### getOneProposal

```solidity
function getOneProposal(uint256 _id) external view returns (struct Voting.Proposal)
```

_Get a proposal from its id._

### addVoter

```solidity
function addVoter(address _addr) external
```

_Allow an address to participate to the vote._

### addProposal

```solidity
function addProposal(string _desc) external
```

_Proposals must have a non empty description and be submitted in the ProposalsRegistrationStarted status._

### setVote

```solidity
function setVote(uint256 _id) external
```

_Vote for a proposition with its id. Require to be in the status VotingSessionStarted and can be done only once by voter._

### startProposalsRegistering

```solidity
function startProposalsRegistering() external
```

_update the workflow status from RegisteringVoters to ProposalsRegistrationStarted_

### endProposalsRegistering

```solidity
function endProposalsRegistering() external
```

_update the workflow status from ProposalsRegistrationStarted to ProposalsRegistrationEnded_

### startVotingSession

```solidity
function startVotingSession() external
```

_update the workflow status from ProposalsRegistrationEnded to VotingSessionStarted_

### endVotingSession

```solidity
function endVotingSession() external
```

_update the workflow status from VotingSessionStarted to VotingSessionEnded_

### tallyVotes

```solidity
function tallyVotes() external
```

_update the winningProposalID with the most voted proposition and update the workflow status from VotingSessionEnded to VotesTallied_

