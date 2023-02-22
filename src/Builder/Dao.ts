import { createStaticId } from '../utils'
import { dao } from '.'
import { ponder } from '../../generated'
import type { BuilderDaosProposal } from '../types'

let proposals: BuilderDaosProposal[] = new Array()

ponder.on('BuilderDAO:ProposalCanceled', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalCanceledEvent, Proposal } = context.entities
  const { proposalId } = event.params

  const proposalIndex = proposals.find(
    (proposal) => proposal.hexId === proposalId.toString()
  )?.index

  await ProposalCanceledEvent.insert(id, {
    dao: dao.id,
    proposalId: proposalIndex || 0,
    createdAt: event.block.timestamp,
  })

  await Proposal.update(
    createStaticId('proposal', dao.id, proposalIndex || 0),
    {
      canceled: true,
    }
  )
})

ponder.on('BuilderDAO:ProposalCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalCreatedEvent, Proposal } = context.entities
  const { proposalId, proposal, targets, values, calldatas, description } =
    event.params

  const proposalIndex = proposals.length + 1
  proposals.push({
    hexId: proposalId.toString(),
    index: proposalIndex,
  })

  const staticId = createStaticId('proposal', dao.id, proposalIndex)

  await Proposal.insert(staticId, {
    dao: dao.id,
    proposalId: proposalIndex,
    proposer: proposal.proposer,
    targets: targets.map((target) => target.toString()),
    values: values.map((value) => value.toString()),
    calldatas: calldatas.map((calldata) => calldata.toString()),
    voteStart: Number(proposal.voteStart),
    voteEnd: Number(proposal.voteEnd),
    description: description.toString(),
    createdAt: event.block.timestamp,
  })

  await ProposalCreatedEvent.insert(id, {
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
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderDAO:ProposalExecuted', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalExecutedEvent, Proposal } = context.entities
  const { proposalId } = event.params

  const proposalIndex = proposals.find(
    (proposal) => proposal.hexId === proposalId.toString()
  )?.index

  await ProposalExecutedEvent.insert(id, {
    dao: dao.id,
    proposalId: proposalIndex || 0,
    createdAt: event.block.timestamp,
  })

  await Proposal.update(
    createStaticId('proposal', dao.id, proposalIndex || 0),
    {
      executed: true,
    }
  )
})

ponder.on('BuilderDAO:ProposalQueued', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalQueuedEvent, Proposal } = context.entities
  const { proposalId, eta } = event.params

  const proposalIndex = proposals.find(
    (proposal) => proposal.hexId === proposalId.toString()
  )?.index

  await ProposalQueuedEvent.insert(id, {
    dao: dao.id,
    proposalId: proposalIndex || 0,
    eta: Number(eta),
    createdAt: event.block.timestamp,
  })

  await Proposal.update(
    createStaticId('proposal', dao.id, proposalIndex || 0),
    {
      queued: true,
    }
  )
})

ponder.on('BuilderDAO:ProposalVetoed', async ({ event, context }) => {
  const id = event.log.logId
  const { ProposalVetoedEvent, Proposal } = context.entities
  const { proposalId } = event.params

  const proposalIndex = proposals.find(
    (proposal) => proposal.hexId === proposalId.toString()
  )?.index

  await ProposalVetoedEvent.insert(id, {
    dao: dao.id,
    proposalId: proposalIndex || 0,
    createdAt: event.block.timestamp,
  })

  await Proposal.update(
    createStaticId('proposal', dao.id, proposalIndex || 0),
    {
      vetoed: true,
    }
  )
})

ponder.on('BuilderDAO:VoteCast', async ({ event, context }) => {
  const id = event.log.logId
  const { VoteCastEvent } = context.entities
  const { voter, proposalId, support, weight: votes, reason } = event.params

  const proposalIndex = proposals.find(
    (proposal) => proposal.hexId === proposalId.toString()
  )?.index

  await VoteCastEvent.insert(id, {
    dao: dao.id,
    voter,
    proposal: createStaticId('proposal', dao.id, proposalIndex || 0),
    proposalId: proposalIndex || 0,
    support: Number(support),
    votes: Number(votes),
    reason: reason.toString(),
    createdAt: event.block.timestamp,
  })
})
