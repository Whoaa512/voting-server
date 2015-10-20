import test from 'ava'
import {List, Map} from 'immutable'
import chai, {expect} from 'chai'
import chaiImmutable from 'chai-immutable'

import {setEntries, next, vote} from '../src/core'

chai.use(chaiImmutable)

test('[setEntries] adds entries to the state', (t) => {
  const state = Map()
  const entries = List.of('Bacon', 'Bits')
  const nextState = setEntries(state, entries)

  expect(nextState).to.equal(Map({
    entries: List.of('Bacon', 'Bits')
  }))
  t.end()
})

test('[setEntries] converts to immutable', (t) => {
  const state = Map()
  const entries = ['Bacon', 'Bits']
  const nextState = setEntries(state, entries)

  expect(nextState).to.equal(Map({
    entries: List.of('Bacon', 'Bits')
  }))
  t.end()
})

test('[next] takes next 2 entries under vote', t => {
  const state = Map({
    entries: List.of('Bacon', 'Bits', 'Awesome')
  })
  const nextState = next(state)
  expect(nextState).to.equal(Map({
    vote: Map({
      pair: List.of('Bacon', 'Bits')
    }),
    entries: List.of('Awesome')
  }))
  t.end()
})

test('[next] puts winner of current vote back to entries', t => {
  const state = Map({
    vote: Map({
      pair: List.of('Bacon', 'Bits'),
      tally: Map({
        'Bacon': 4,
        'Bits': 2
      })
    }),
    entries: List.of('Sunshine', 'Millions', '127 Hours')
  })
  const nextState = next(state)
  expect(nextState).to.equal(Map({
    vote: Map({
      pair: List.of('Sunshine', 'Millions')
    }),
    entries: List.of('127 Hours', 'Bacon')
  }))
  t.end()
})

test('[next] puts both from tied vote back to entries', t => {
  const state = Map({
    vote: Map({
      pair: List.of('Bacon', 'Bits'),
      tally: Map({
        'Bacon': 4,
        'Bits': 4
      })
    }),
    entries: List.of('Sunshine', 'Millions', '127 Hours')
  })
  const nextState = next(state)
  expect(nextState).to.equal(Map({
    vote: Map({
      pair: List.of('Sunshine', 'Millions')
    }),
    entries: List.of('127 Hours', 'Bacon', 'Bits')
  }))
  t.end()
})

test('[next] marks winner when just one entry left', t => {
  const state = Map({
    vote: Map({
      pair: List.of('Bacon', 'Bits'),
      tally: Map({
        'Bacon': 4,
        'Bits': 2
      })
    }),
    entries: List.of()
  })
  const nextState = next(state)
  expect(nextState).to.equal(Map({
    winner: 'Bacon'
  }))
  t.end()
})

test('[vote] creates a tally for the voted entry', t => {
  const state = Map({
    pair: List.of('Bacon', 'Bits')
  })
  const nextState = vote(state, 'Bacon')
  expect(nextState).to.equal(Map({
    pair: List.of('Bacon', 'Bits'),
    tally: Map({
      'Bacon': 1
    })
  }))
  t.end()
})

test('[vote] adds to existing for the voted entry', t => {
  const state = Map({
    pair: List.of('Bacon', 'Bits'),
    tally: Map({
      'Bacon': 3,
      'Bits': 2
    })
  })
  const nextState = vote(state, 'Bacon')
  expect(nextState).to.equal(Map({
    pair: List.of('Bacon', 'Bits'),
    tally: Map({
      'Bacon': 4,
      'Bits': 2
    })
  }))
  t.end()
})
