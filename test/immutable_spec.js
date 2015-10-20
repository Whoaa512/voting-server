import test from 'ava'
import chai, {expect} from 'chai'
import {List, Map} from 'immutable'
import chaiImmutable from 'chai-immutable'

chai.use(chaiImmutable)

test('a number is immutable', (t) => {
  function increment (currentState) {
    return currentState + 1
  }

  let state = 42
  let nextState = increment(state)

  t.ok(nextState === 43)
  t.ok(state === 42)
  t.end()
})

test('a List is immutable', (t) => {
  function addItem (currentState, newItem) {
    return currentState.push(newItem)
  }

  let state = List.of('Bacon', 'Bits')
  let nextState = addItem(state, 'Awesome')

  expect(nextState).to.equal(List.of(
    'Bacon',
    'Bits',
    'Awesome'
  ))
  expect(state).to.equal(List.of(
    'Bacon',
    'Bits'
  ))
  t.end()
})

test('a Tree is immutable', (t) => {
  function addItem (currentState, newItem) {
    return currentState.update('items', items => items.push(newItem))
  }

  let state = Map({
    items: List.of('Bacon', 'Bits')
  })
  let nextState = addItem(state, 'Awesome')

  expect(nextState).to.equal(Map({
    items: List.of(
      'Bacon',
      'Bits',
      'Awesome'
    )
  }))

  expect(state).to.equal(Map({
    items: List.of(
      'Bacon',
      'Bits'
    )
  }))

  t.end()
})
