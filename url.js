const { Config } = require('@supersoccer/misty')
const _ = require('lodash')
const querystring = require('querystring')
const parseUrl = require('url').parse

class Url {
  constructor (env) {
    this.env = env || {}
  }

  /**
   * Build complete URL with query strings
   * @param  {string} url main URL
   * @param  {mixed} qs  query string, can be string or object
   * @return {string}     complete URL
   */
  // Previously #url()
  build (url, query) {
    if (_.isEmpty(query) || typeof query === 'string') {
      return url
    }

    const oldQuery = this.query(url)
    const queries = querystring.stringify(this.mergeQueries(oldQuery, query))
    url = this.original(url)
    return `${url}?${queries}`
  }

  changeApp (appId) {
    return this.base(this.env.url, { app: appId })
  }

  original (url) {
    return url.replace(/\?.*/, '')
  }

  app (path, qs) {
    const appId = this.env.appId
    qs = qs || {}

    if (_.isUndefined(appId)) {
      return this.base(path, qs)
    }

    const query = this.mergeQueries(qs, { app: appId })

    return this.base(path, query)
  }

  query (url) {
    return parseUrl(url, true).query
  }

  mergeQueries (query1, query2) {
    return _.merge(query1, query2)
  }
  // Previously #baseUrl
  base (path, qs) {
    if ((_.isEmpty(path) || _.isUndefined(path) || _.isUndefined(path)) && _.isUndefined(qs)) {
      return Config.App.host
    }

    path = path.replace(Config.App.host, '').replace(/^\/+/, '')
    const url = `${Config.App.host}/${path}`
    const query = qs || {}

    return this.build(url, query)
  }

  get host () {
    return Config.App.host
  }

  asset (asset) {
    return `${Config.Assets.url}/${asset.replace(/^\/+/, '')}?v=${Config.Assets.version}`
  }
}

module.exports = Url
