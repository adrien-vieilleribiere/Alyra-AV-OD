# Solidity API

## Voting

### winningProposalID

```solidity
uint256 winningProposalID
```

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

### getOneProposal

```solidity
function getOneProposal(uint256 _id) external view returns (struct Voting.Proposal)
```

### addVoter

```solidity
function addVoter(address _addr) external
```

### addProposal

```solidity
function addProposal(string _desc) external
```

### setVote

```solidity
function setVote(uint256 _id) external
```

### startProposalsRegistering

```solidity
function startProposalsRegistering() external
```

### endProposalsRegistering

```solidity
function endProposalsRegistering() external
```

### startVotingSession

```solidity
function startVotingSession() external
```

### endVotingSession

```solidity
function endVotingSession() external
```

### tallyVotes

```solidity
function tallyVotes() external
```

