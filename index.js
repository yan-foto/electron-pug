'use strict'

const {protocol} = require('electron')
const fs = require('fs')
const path = require('path')
const pug = require('pug')
const mime = require('mime')
const EventEmitter = require('events')

const HTML_MIME = mime.getType('html')

class PugEmitter extends EventEmitter {}

/**
 * Returns path for file from given URL.
 *
 * 'url' module is internally used to parse URLs. For *nix file
 * system URLs 'pathname' of parsed object is used. For Window,
 * however, local files start with a slash if no host is given
 * and this functions simply drops that leading slash with no
 * further complicated logic.
 *
 * @param  {String} url URL denoting file
 * @return {String} path to file
 */
const getPath = url => {
  let parsed = require('url').parse(url)
  let result = decodeURIComponent(parsed.pathname)

  // Local files in windows start with slash if no host is given
  // file:///c:/something.pug
  if (process.platform === 'win32' && !parsed.host.trim()) {
    result = result.substr(1)
  }

  return result
}

/**
 * Setups pug interceptro.
 *
 * This function must be called after electron app
 * is ready.
 *
 * @param {Object} options pug compiler options
 * @param {Object} locals pug locals
 * @returns {Promise} promise resolving to PugEmitter
 */
const setupPug = (options = {}, locals) => (
  new Promise((resolve, reject) => {
    let emitter = new PugEmitter()

    protocol.interceptBufferProtocol('file', (request, result) => {
      let file = getPath(request.url)

      // See if file actually exists
      try {
        let content = fs.readFileSync(file)
        let ext = path.extname(file)
        let data = {data: content, mimeType: mime.getType(ext)}

        if (ext === '.pug') {
          let compiled = pug.compileFile(file, options)(locals)
          data = {data: Buffer.from(compiled), mimeType: HTML_MIME}
        }

        return result(data)
      } catch (err) {
        // See here for error numbers:
        // https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h
        let errorData
        if (err.code === 'ENOENT') {
          errorData = -6
        } else if (typeof err.code === 'number') {
          errorData = -2
        } else {
          // Remaining errors are considered to be pug errors
          // All errors wrt. Pug are rendered in browser
          errorData = {data: Buffer.from(`<pre style="tab-size:1">${err}</pre>`), mimeType: HTML_MIME}
        }

        emitter.emit('error', err)
        return result(errorData)
      }
    }, err => err ? reject(err) : resolve(emitter))
  })
)

module.exports = setupPug
