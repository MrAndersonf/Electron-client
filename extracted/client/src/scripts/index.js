const path = require('path');
const fs = require('fs');
const json = require('jsonfile');
const fse = require('fs-extra');
const shell = require('shelljs')

module.exports = {
  saveNewScript(name, data) {
    let file = path.resolve(__dirname + '/../scripts/informations/' + name + '.json')
    json.writeFile(file, data)
    this.copyDiretory(data.path, name)
  },
  allSavedScripts() {
    let scripts = fs.readdirSync(path.resolve(__dirname + '/../scripts/informations/'));
    return scripts
  },
  scripts() {
    let savedOnes = this.allSavedScripts();
    let results = savedOnes.map(data => {
      return json.readFileSync(path.resolve(__dirname + '/../scripts/informations/' + data))
    });
    return results
  },
  async copyDiretory(origin, name) {
    const srcDir = origin;
    const destDir = path.resolve(__dirname + '/../scripts/folders/' + name)
    let result = true
    try {
      await fse.copy(srcDir, destDir)
    } catch (err) {
      return false
    }
    this.execute(name)
    return result
  },
  execute(name) {
    shell.cd(__dirname + '/../scripts/folders/' + name);
    shell.config.execPath = String(shell.which('node'))
    shell.exec(`yarn install`)
  },
  findScript(name) {
    console.log(name)
    let all = this.scripts()
    let e = all.filter(el => {
      if (el.name == name) {
        return el.exec;
      }
    })
    console.log(e)
    return e[0].exec
  }
}