import { DAO } from '../types'
import { ponder } from '../../generated'

const dao: DAO = 'Nouns'

ponder.on('NounsDAO:ProposalCanceled', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalCanceled } = context.entities
  const { id: proposalId } = event.params

  await ProposalCanceled.insert(id, {
    dao,
    proposalId: Number(proposalId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsDAO:ProposalCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalCreated } = context.entities
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

  await ProposalCreated.insert(id, {
    dao,
    proposalId: Number(proposalId),
    proposer,
    targets: targets.map((target) => target.toString()),
    values: values.map((value) => value.toString()),
    signatures: signatures.map((signature) => signature.toString()),
    calldatas: calldatas.map((calldata) => calldata.toString()),
    startBlock: Number(startBlock),
    endBlock: Number(endBlock),
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
  const { ProposalExecuted } = context.entities
  const { id: proposalId } = event.params

  await ProposalExecuted.insert(id, {
    dao,
    proposalId: Number(proposalId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsDAO:ProposalQueued', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalQueued } = context.entities
  const { id: proposalId, eta } = event.params

  await ProposalQueued.insert(id, {
    dao,
    proposalId: Number(proposalId),
    eta: Number(eta),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsDAO:ProposalVetoed', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalVetoed } = context.entities
  const { id: proposalId } = event.params

  await ProposalVetoed.insert(id, {
    dao,
    proposalId: Number(proposalId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsDAO:RefundableVote', async ({ event, context }) => {
  const id = event.log.logId
  const { RefundableVote } = context.entities
  const { voter, refundAmount, refundSent } = event.params

  await RefundableVote.insert(id, {
    dao,
    voter,
    refundAmount: refundAmount.toString(),
    refundSent: refundSent,
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsDAO:VoteCast', async ({ event, context }) => {
  const id = event.log.logId
  const { VoteCast } = context.entities
  const { voter, proposalId, support, votes, reason } = event.params

  await VoteCast.insert(id, {
    dao,
    voter,
    proposalId: Number(proposalId),
    support: Number(support),
    votes: Number(votes),
    reason: reason.toString(),
    createdAt: event.block.timestamp,
  })
})
