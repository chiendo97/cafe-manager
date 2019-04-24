const sharp = require('sharp')
const uuidv4 = require('uuid/v4')
const path = require('path')
const mkdirp = require('mkdirp')

class Resize {
  constructor(folder) {
    this.folder = folder
  }

  async save(buffer) {
    const filename = Resize.filename()
    const filepath = this.filepath(filename)

    await mkdirp(this.filepath(''))

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.contain,
        background: {
          r: 255,
          g: 255,
          b: 255,
        }
      })
      .toFile(filepath)

    return filename
  }

  static filename() {

    return `${uuidv4()}.png`
  }

  filepath(filename) {

    return path.resolve(`${this.folder}/${filename}`)
  }
}

module.exports = Resize
