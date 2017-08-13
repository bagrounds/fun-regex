/**
 *
 * @module fun-regex
 */
;(function () {
  'use strict'

  /* imports */
  var fn = require('fun-function')
  var object = require('fun-object')
  var guarded = require('guarded')
  var type = require('fun-type')

  var api = {
    test: test,
    match: match,
    or: or,
    withFlags: withFlags
  }

  var guards = {
    test: guarded(
      type.isTuple([type.isRegExp, type.isString]),
      type.isBoolean
    ),
    match: guarded(
      type.isTuple([type.isRegExp, type.isString]),
      type.isArrayOf(type.isString)
    ),
    or: guarded(
      type.isTuple([type.isRegExp, type.isRegExp]),
      type.isRegExp
    ),
    withFlags: guarded(
      type.isTuple([type.isRegExp, type.isString]),
      type.isRegExp
    )
  }

  /* exports */
  module.exports = object.map(fn.curry, object.ap(guards, api))
  module.exports.raw = api

  /**
   * @function module:fun-regex.test
   *
   * @param {RegExp} re - regular expression
   * @param {String} string - to test against
   *
   * @return {Boolean} if re finds a match in string
   */
  function test (re, string) {
    return re.test(string)
  }

  /**
   * @function module:fun-regex.match
   *
   * @param {RegExp} re - regular expression
   * @param {String} string - to match against
   *
   * @return {Array<String>} all (non-overlapping) matches found in string
   */
  function match (re, string) {
    return string.match(withFlags(re, 'g')) || []
  }

  /**
   * @function module:fun-regex.withFlags
   *
   * @param {RegExp} re - regular expression
   * @param {String} flags - to add to re's flags
   *
   * @return {RegExp} re with flags
   */
  function withFlags (re, flags) {
    return RegExp(re.source, (re.flags || '') + flags)
  }

  /**
   * @function module:fun-regex.or
   *
   * @param {RegExp} re1 - regular expression
   * @param {RegExp} re2 - regular expression
   *
   * @return {RegExp} re1 | re2
   */
  function or (re1, re2) {
    return RegExp(re1.source + '|' + re2.source)
  }
})()

