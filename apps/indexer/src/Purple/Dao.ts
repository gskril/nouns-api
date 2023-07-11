import { createStaticId } from '../utils'
import { dao } from '.'
import { ponder } from '../../generated'
import type { BuilderDaosProposal } from '../types'

let proposals: BuilderDaosProposal[] = new Array()

ponder.on('PurpleDAO:ProposalCanceled', async ({ event, context }) => {
  const id = event.log.id
  const { ProposalCanceledEvent, Proposal } = context.entities
  const { proposalId } = event.params

  const proposalIndex = proposals.find(
    (proposal) => proposal.hexId === proposalId.toString()
  )?.index!

  await ProposalCanceledEvent.create({
    id,
    data: {
      dao: dao.id,
      proposalId: proposalIndex,
      createdAt: Number(event.block.timestamp),
    },
  })

  await Proposal.update({
    id: createStaticId('proposal', dao.id, proposalIndex),
    data: {
      canceled: true,
    },
  })
})

ponder.on('PurpleDAO:ProposalCreated', async ({ event, context }) => {
  const id = event.log.id
  const { ProposalCreatedEvent, Proposal } = context.entities
  const { proposalId, proposal, targets, values, calldatas, description } =
    event.params

  const proposalIndex = proposals.length + 1
  proposals.push({
    hexId: proposalId.toString(),
    index: proposalIndex,
  })

  const staticId = createStaticId('proposal', dao.id, proposalIndex)

  await Proposal.create({
    id: staticId,
    data: {
      dao: dao.id,
      proposalId: proposalIndex,
      proposer: proposal.proposer,
      targets: targets.map((target) => target.toString()),
      values: values.map((value) => value.toString()),
      calldatas: calldatas.map((calldata) => calldata.toString()),
      voteStart: Number(proposal.voteStart),
      voteEnd: Number(proposal.voteEnd),
      description: description.toString(),
      createdAt: Number(event.block.timestamp),
    },
  })

  await ProposalCreatedEvent.create({
    id,
    data: {
      dao: dao.id,
      proposal: staticId,
      proposalId: proposalIndex,
      proposer: proposal.proposer,
      targets: targets.map((target) => target.toString()),
      values: values.map((value) => value.toString()),
      calldatas: calldatas.map((calldata) => calldata.toString()),
      voteStart: Number(proposal.voteStart),
      voteEnd: Number(proposal.voteEnd),
      description: description.toString(),
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on('PurpleDAO:ProposalExecuted', async ({ event, context }) => {
  const id = event.log.id
  const { ProposalExecutedEvent, Proposal } = context.entities
  const { proposalId } = event.params

  const proposalIndex = proposals.find(
    (proposal) => proposal.hexId === proposalId.toString()
  )?.index!

  await ProposalExecutedEvent.create({
    id,
    data: {
      dao: dao.id,
      proposalId: proposalIndex,
      createdAt: Number(event.block.timestamp),
    },
  })

  await Proposal.update({
    id: createStaticId('proposal', dao.id, proposalIndex),
    data: {
      executed: true,
    },
  })
})

ponder.on('PurpleDAO:ProposalQueued', async ({ event, context }) => {
  const id = event.log.id
  const { ProposalQueuedEvent, Proposal } = context.entities
  const { proposalId, eta } = event.params

  const proposalIndex = proposals.find(
    (proposal) => proposal.hexId === proposalId.toString()
  )?.index!

  await ProposalQueuedEvent.create({
    id,
    data: {
      dao: dao.id,
      proposalId: proposalIndex,
      eta: Number(eta),
      createdAt: Number(event.block.timestamp),
    },
  })

  await Proposal.update({
    id: createStaticId('proposal', dao.id, proposalIndex),
    data: {
      queued: true,
    },
  })
})

ponder.on('PurpleDAO:ProposalVetoed', async ({ event, context }) => {
  const id = event.log.id
  const { ProposalVetoedEvent, Proposal } = context.entities
  const { proposalId } = event.params

  const proposalIndex = proposals.find(
    (proposal) => proposal.hexId === proposalId.toString()
  )?.index!

  await ProposalVetoedEvent.create({
    id,
    data: {
      dao: dao.id,
      proposalId: proposalIndex,
      createdAt: Number(event.block.timestamp),
    },
  })

  await Proposal.update({
    id: createStaticId('proposal', dao.id, proposalIndex),
    data: {
      vetoed: true,
    },
  })
})

ponder.on('PurpleDAO:VoteCast', async ({ event, context }) => {
  const id = event.log.id
  const { VoteCastEvent } = context.entities
  const { voter, proposalId, support, weight: votes, reason } = event.params

  const proposalIndex = proposals.find(
    (proposal) => proposal.hexId === proposalId.toString()
  )?.index!

  await VoteCastEvent.create({
    id,
    data: {
      dao: dao.id,
      voter,
      proposal: createStaticId('proposal', dao.id, proposalIndex),
      proposalId: proposalIndex,
      support: Number(support),
      votes: Number(votes),
      reason: reason.toString(),
      createdAt: Number(event.block.timestamp),
    },
  })
})
