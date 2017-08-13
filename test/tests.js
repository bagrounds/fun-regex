;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var object = require('fun-object')
  var funTest = require('fun-test')
  var arrange = require('fun-arrange')
  var array = require('fun-array')

  var orTests = [
    function orABDoesNotMatchC (subject, cb) {
      cb(null, !subject.or(/[0-9]/, /[a-z]/).test('.,'))
    },
    function orABMatchesB (subject, cb) {
      cb(null, subject.or(/[0-9]/, /[a-z]/).test('.a'))
    },
    function orABMatchesA (subject, cb) {
      cb(null, subject.or(/[0-9]/, /[a-z]/).test('.1'))
    }
  ]

  var tests = [
    [
      [[/[0-9]+/, 'a1b23c'], ['1', '23']],
      [[/[0-9]/, 'a1b23c'], ['1', '2', '3']],
      [[/[0-9]/, 'abc'], []],
      [[/[0-9]/, 'a1bc'], ['1']]
    ].map(array.append('match')),
    [
      [[/[0-9]/, 'abc'], false],
      [[/[0-9]/, 'a1bc'], true]
    ].map(array.append('test'))
  ].reduce(array.concat, [])
    .map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      predicate: predicate.equalDeep,
      contra: object.get
    }))

  /* exports */
  module.exports = tests
    .map(funTest.sync)
    .concat(orTests)
})()

