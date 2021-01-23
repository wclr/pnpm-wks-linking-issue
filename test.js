const path = require('path')
const resolved = require.resolve('@cycle/react', { paths: [__dirname + '/pkg'] })

const pkgPnpmDir = path.dirname(resolved)
console.log('\nResolving xstream from:\n', pkgPnpmDir)

try {
  const resolved = require.resolve('xstream', { paths: [path.dirname(pkgPnpmDir)] })
  console.log('\nResolved ok:\n', resolved)
} catch (e) {
  console.log('\nCould not resolve!\n')  
}
