import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('BuilderDAO:ProposalCanceled', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalCanceledEvent } = context.entities
  const { proposalId } = event.params

  await ProposalCanceledEvent.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderDAO:ProposalCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalCreatedEvent } = context.entities
  const { proposalId, proposal, targets, values, calldatas, description } =
    event.params

  await ProposalCreatedEvent.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    proposer: proposal.proposer,
    targets: targets.map((target) => target.toString()),
    values: values.map((value) => value.toString()),
    calldatas: calldatas.map((calldata) => calldata.toString()),
    voteStart: Number(proposal.voteStart),
    voteEnd: Number(proposal.voteEnd),
    description: description.toString(),
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderDAO:ProposalExecuted', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalExecutedEvent } = context.entities
  const { proposalId } = event.params

  await ProposalExecutedEvent.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderDAO:ProposalQueued', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalQueuedEvent } = context.entities
  const { proposalId, eta } = event.params

  await ProposalQueuedEvent.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    eta: Number(eta),
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderDAO:ProposalVetoed', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalVetoedEvent } = context.entities
  const { proposalId } = event.params

  await ProposalVetoedEvent.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderDAO:VoteCast', async ({ event, context }) => {
  const id = event.log.logId
  const { VoteCastEvent } = context.entities
  const { voter, proposalId, support, weight: votes, reason } = event.params

  await VoteCastEvent.insert(id, {
    dao: dao.id,
    voter,
    proposalId: Number(proposalId),
    support: Number(support),
    votes: Number(votes),
    reason: reason.toString(),
    createdAt: event.block.timestamp,
  })
})
