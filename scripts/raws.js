const { readFile, writeFile, readdirSync } = require('fs')
const path = require('path')

var demosPath = './src/demos/'

const tsxPath = path.resolve(demosPath)
const rawPath = path.resolve(demosPath, 'raws')
const tsxItems = readdirSync(tsxPath)

tsxItems.forEach((item) => {
  matchs = item.match(/(.+)\.tsx$/)
  if (matchs) {
    readFile(`${tsxPath}/${item}`, (err, data) => {
      if (err) {
        return console.log(err)
      }
      writeFile(`${rawPath}/${item.replace('tsx', 'raw')}`, data, () => {})
    })
  }
})
