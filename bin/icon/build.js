import fs from 'fs'
import path from 'path'
import config from '../../icon.config.js'
import buildIconsObject from './build-icons-object.js'

const OUT_DIR = path.resolve('src', 'assets', 'icons')

console.log(`Cleaning ${OUT_DIR}`)

fs.rmdirSync(OUT_DIR, { recursive: true })
fs.mkdirSync(OUT_DIR)

Object.keys(config).forEach((vendor) => {
  console.log(`Building ${vendor}`)
  const inDir = path.resolve(path.join.apply(null, config[vendor].src.split('/')))

  const svgFiles = fs
    .readdirSync(inDir)
    .filter(file => path.extname(file) === '.svg')

  const getSvg = svgFile => fs.readFileSync(path.join(inDir, svgFile))

  const icons = buildIconsObject(svgFiles, getSvg)
  Object.keys(icons).forEach(icon => {
    const OUT_FILE = path.join(OUT_DIR, `${vendor}:${icon}.svg`)
    fs.writeFileSync(OUT_FILE, icons[icon])
  })
})
