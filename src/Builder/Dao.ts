import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('BuilderDAO:ProposalCanceled', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalCanceled } = context.entities
  const { proposalId } = event.params

  await ProposalCanceled.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderDAO:ProposalCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalCreated } = context.entities
  const { proposalId, proposal, targets, values, calldatas, description } =
    event.params

  await ProposalCreated.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    proposer: proposal.proposer,
    targets: targets.map((target) => target.toString()),
    values: values.map((value) => value.toString()),
    calldatas: calldatas.map((calldata) => calldata.toString()),
    startBlock: Number(proposal.voteStart),
    endBlock: Number(proposal.voteEnd),
    description: description.toString(),
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderDAO:ProposalExecuted', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalExecuted } = context.entities
  const { proposalId } = event.params

  await ProposalExecuted.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderDAO:ProposalQueued', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalQueued } = context.entities
  const { proposalId, eta } = event.params

  await ProposalQueued.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    eta: Number(eta),
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderDAO:ProposalVetoed', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalVetoed } = context.entities
  const { proposalId } = event.params

  await ProposalVetoed.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderDAO:VoteCast', async ({ event, context }) => {
  const id = event.log.logId
  const { VoteCast } = context.entities
  const { voter, proposalId, support, weight: votes, reason } = event.params

  await VoteCast.insert(id, {
    dao: dao.id,
    voter,
    proposalId: Number(proposalId),
    support: Number(support),
    votes: Number(votes),
    reason: reason.toString(),
    createdAt: event.block.timestamp,
  })
})
