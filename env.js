/**
 * Runtime environment class, this class is only available on runtime
 */
class Env {
  /**
   * Set environment data
   * @param {objet} data - Environment object data, set in bifrost
   */
  constructor (req, res) {
    this.data = {
      query: req.query,
      path: req.path,
      url: req.originalUrl,
      params: req.params,
      appId: res.locals.appId
    }
  }

  /**
   * Get request query
   */
  get query () {
    return this.data.query
  }

  /**
   * Get request path
   */
  get path () {
    return this.data.path
  }

  /**
   * Get request url
   */
  get url () {
    return this.data.url
  }

  /**
   * Get request params
   */
  get params () {
    return this.data.params
  }

  /**
   * Get request app ID
   */
  get appId () {
    return this.data.appId
  }
}

module.exports = Env
