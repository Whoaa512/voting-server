import test from 'ava'
import {Map, fromJS} from 'immutable'
import chai, {expect} from 'chai'
import chaiImmutable from 'chai-immutable'

import makeStore from '../src/store'

chai.use(chaiImmutable)

test('is a Redux store configured with correct reducer', (t) => {
  const store = makeStore()
  expect(store.getState()).to.equal(Map())
  store.dispatch({
    type: 'SET_ENTRIES',
    entries: ['Bacon', 'Bits']
  })
  expect(store.getState()).to.equal(fromJS({
    entries: ['Bacon', 'Bits']
  }))
  t.end()
})
