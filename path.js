const path = require('path')
const registeredModules = ['base', 'containers', 'services', 'modules', 'components']
path.basepath = {}
const rootPath = process.env.MISTY_ENV === 'development' ? '../misty-app' : '../../..'

registeredModules.forEach((module) => {
  path.basepath[module] = (_path) => path.resolve(__dirname, rootPath, module !== registeredModules[0] ? module : '', _path || '')
})

module.exports = path
