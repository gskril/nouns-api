import { createStaticId } from '../utils'
import { dao } from '.'
import { estimateProposalTimestamps } from '../utils'
import { ponder } from '../../generated'

ponder.on('LilNounsDAO:ProposalCanceled', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalCanceledEvent, Proposal } = context.entities
  const { id: proposalId } = event.params

  await ProposalCanceledEvent.create({
    id,
    data: {
      dao: dao.id,
      proposalId: Number(proposalId),
      createdAt: Number(event.block.timestamp),
    },
  })

  await Proposal.update({
    id: createStaticId('proposal', dao.id, Number(proposalId)),
    data: {
      canceled: true,
    },
  })
})

ponder.on('LilNounsDAO:ProposalCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalCreatedEvent, Proposal } = context.entities
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

  const staticId = createStaticId('proposal', dao.id, Number(proposalId))

  await Proposal.create({
    id: staticId,
    data: {
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
      createdAt: Number(event.block.timestamp),
    },
  })

  await ProposalCreatedEvent.create({
    id,
    data: {
      dao: dao.id,
      proposal: staticId,
      proposalId: Number(proposalId),
      proposer,
      targets: targets.map((target) => target.toString()),
      values: values.map((value) => value.toString()),
      signatures: signatures.map((signature) => signature.toString()),
      calldatas: calldatas.map((calldata) => calldata.toString()),
      voteStart,
      voteEnd,
      description: description.toString(),
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on(
  'LilNounsDAO:ProposalCreatedWithRequirements',
  async ({ event, context }) => {}
)

ponder.on('LilNounsDAO:ProposalExecuted', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalExecutedEvent, Proposal } = context.entities
  const { id: proposalId } = event.params

  await ProposalExecutedEvent.create({
    id,
    data: {
      dao: dao.id,
      proposalId: Number(proposalId),
      createdAt: Number(event.block.timestamp),
    },
  })

  await Proposal.update({
    id: createStaticId('proposal', dao.id, Number(proposalId)),
    data: {
      executed: true,
    },
  })
})

ponder.on('LilNounsDAO:ProposalQueued', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalQueuedEvent, Proposal } = context.entities
  const { id: proposalId, eta } = event.params

  await ProposalQueuedEvent.create({
    id,
    data: {
      dao: dao.id,
      proposalId: Number(proposalId),
      eta: Number(eta),
      createdAt: Number(event.block.timestamp),
    },
  })

  await Proposal.update({
    id: createStaticId('proposal', dao.id, Number(proposalId)),
    data: {
      queued: true,
    },
  })
})

ponder.on('LilNounsDAO:ProposalVetoed', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalVetoedEvent, Proposal } = context.entities
  const { id: proposalId } = event.params

  await ProposalVetoedEvent.create({
    id,
    data: {
      dao: dao.id,
      proposalId: Number(proposalId),
      createdAt: Number(event.block.timestamp),
    },
  })

  await Proposal.update({
    id: createStaticId('proposal', dao.id, Number(proposalId)),
    data: {
      vetoed: true,
    },
  })
})

ponder.on('LilNounsDAO:RefundableVote', async ({ event, context }) => {
  const id = event.log.logId
  const { RefundableVoteEvent } = context.entities
  const { voter, refundAmount, refundSent } = event.params

  await RefundableVoteEvent.create({
    id,
    data: {
      dao: dao.id,
      voter,
      refundAmount: refundAmount.toString(),
      refundSent: refundSent,
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on('LilNounsDAO:VoteCast', async ({ event, context }) => {
  const id = event.log.logId
  const { VoteCastEvent } = context.entities
  const { voter, proposalId, support, votes, reason } = event.params

  await VoteCastEvent.create({
    id,
    data: {
      dao: dao.id,
      voter,
      proposal: createStaticId('proposal', dao.id, Number(proposalId)),
      proposalId: Number(proposalId),
      support: Number(support),
      votes: Number(votes),
      reason: reason.toString(),
      createdAt: Number(event.block.timestamp),
    },
  })
})
