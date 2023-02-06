import { dao } from './'
import { estimateProposalTimestamps } from '../utils'
import { ponder } from '../../generated'

ponder.on('NounsDAO:ProposalCanceled', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalCanceledEvent } = context.entities
  const { id: proposalId } = event.params

  await ProposalCanceledEvent.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsDAO:ProposalCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalCreatedEvent } = context.entities
  const {
    id: proposalId,
    proposer,
    targets,
    values,
    signatures,
    calldatas,
    startBlock,
    endBlock,
    description,
  } = event.params

  const { voteStart, voteEnd } = estimateProposalTimestamps(
    event,
    startBlock,
    endBlock
  )

  await ProposalCreatedEvent.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    proposer,
    targets: targets.map((target) => target.toString()),
    values: values.map((value) => value.toString()),
    signatures: signatures.map((signature) => signature.toString()),
    calldatas: calldatas.map((calldata) => calldata.toString()),
    voteStart,
    voteEnd,
    description: description.toString(),
    createdAt: event.block.timestamp,
  })
})

ponder.on(
  'NounsDAO:ProposalCreatedWithRequirements',
  async ({ event, context }) => {}
)

ponder.on('NounsDAO:ProposalExecuted', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalExecutedEvent } = context.entities
  const { id: proposalId } = event.params

  await ProposalExecutedEvent.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsDAO:ProposalQueued', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalQueuedEvent } = context.entities
  const { id: proposalId, eta } = event.params

  await ProposalQueuedEvent.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    eta: Number(eta),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsDAO:ProposalVetoed', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalVetoedEvent } = context.entities
  const { id: proposalId } = event.params

  await ProposalVetoedEvent.insert(id, {
    dao: dao.id,
    proposalId: Number(proposalId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsDAO:RefundableVote', async ({ event, context }) => {
  const id = event.log.logId
  const { RefundableVoteEvent } = context.entities
  const { voter, refundAmount, refundSent } = event.params

  await RefundableVoteEvent.insert(id, {
    dao: dao.id,
    voter,
    refundAmount: refundAmount.toString(),
    refundSent: refundSent,
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsDAO:VoteCast', async ({ event, context }) => {
  const id = event.log.logId
  const { VoteCastEvent } = context.entities
  const { voter, proposalId, support, votes, reason } = event.params

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
