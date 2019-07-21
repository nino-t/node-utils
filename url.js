const { Config } = require('@supersoccer/misty-loader')
const _ = require('lodash')
const querystring = require('querystring')
const parseUrl = require('url').parse

class Url {
  constructor (locals) {
    this.locals = locals
    this.env = locals.Utils ? locals.Utils.Env : {}
  }

  /**
   * Build complete URL with query strings
   * @param  {string} url main URL
   * @param  {mixed} qs  query string, can be string or object
   * @return {string}     complete URL
   */
  // Previously #url()
  build (url, query) {
    if (this.locals.appLock) {
      url = this.appDomainUrl(url)
    }

    if (_.isEmpty(query) || typeof query === 'string') {
      return url
    }

    const oldQuery = this.query(url)
    const queries = querystring.stringify(this.mergeQueries(oldQuery, query))
    url = this.original(url)
    return `${url}?${queries}`
  }

  appDomainUrl (url) {
    if (this.locals.appLock && !_.isUndefined(this.locals.xURL)) {
      const appHost = Url.cleanAppDomainUrl(Config.App.host)
      const regex = new RegExp(`^(http[s]?:\/\/)(${appHost})(.*)`)
      url = url.replace(regex, `$1${this.locals.xURL}$3`)
    }

    return url
  }

  changeApp (appId) {
    return this.base(this.env.url, { app: appId })
  }

  original (url) {
    return url.replace(/\?.*/, '')
  }

  static cleanAppDomainUrl (url) {
    if (!_.isUndefined(url) && typeof url === 'string') {
      const appDomain = url.replace(/^http[s]?:\/\/|\/$/g, '')
      if (appDomain !== '') {
        return appDomain
      }
    }
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
    return `${this.locals.Utils.Url.build(Config.Assets.url)}/${asset.replace(/^\/+/, '')}?v=${Config.Assets.version}`
  }
}

module.exports = Url
