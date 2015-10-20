import test from 'ava'
import {Map, fromJS} from 'immutable'
import chai, {expect} from 'chai'
import chaiImmutable from 'chai-immutable'

import reducer from '../src/reducer'

chai.use(chaiImmutable)

test('[reducer] handles SET_ENTRIES', (t) => {
  const initialState = Map()
  const action = {type: 'SET_ENTRIES', entries: ['Bacon']}
  const nextState = reducer(initialState, action)

  expect(nextState).to.equal(fromJS({
    entries: ['Bacon']
  }))
  t.end()
})

test('[reducer] handles NEXT', (t) => {
  const initialState = fromJS({
    entries: ['Bacon', 'Bits']
  })
  const action = {type: 'NEXT'}
  const nextState = reducer(initialState, action)

  expect(nextState).to.equal(fromJS({
    vote: {
      pair: ['Bacon', 'Bits']
    },
    entries: []
  }))
  t.end()
})

test('[reducer] handles VOTE', (t) => {
  const initialState = fromJS({
    vote: {
      pair: ['Bacon', 'Bits']
    },
    entries: []
  })
  const action = {type: 'VOTE', entry: 'Bacon'}
  const nextState = reducer(initialState, action)

  expect(nextState).to.equal(fromJS({
    vote: {
      pair: ['Bacon', 'Bits'],
      tally: {Bacon: 1}
    },
    entries: []
  }))
  t.end()
})

test('[reducer] has initial State', (t) => {
  const action = {type: 'SET_ENTRIES', entries: ['Bacon', 'Bits']}
  const nextState = reducer(undefined, action)
  expect(nextState).to.equal(fromJS({
    entries: ['Bacon', 'Bits']
  }))
  t.end()
})

test('[reducer] can be used with reduce', (t) => {
  const actions = [
    {type: 'SET_ENTRIES', entries: ['Bacon', 'Bits']},
    {type: 'NEXT'},
    {type: 'VOTE', entry: 'Bacon'},
    {type: 'VOTE', entry: 'Bits'},
    {type: 'VOTE', entry: 'Bacon'},
    {type: 'NEXT'}
  ]
  const finalState = actions.reduce(reducer, Map())
  expect(finalState).to.equal(fromJS({
    winner: 'Bacon'
  }))
  t.end()
})
