class Utils {
  static get Lodash () {
    return require('lodash')
  }

  static get Moment () {
    return require('moment')
  }

  static get Path () {
    return require('./path')
  }

  static get Url () {
    return require('./url')
  }

  static get url () {
    return new Utils.Url()
  }

  static get Mixin () {
    return require('./mixin')
  }

  static get Env () {
    return require('./env')
  }
}

module.exports = Utils
