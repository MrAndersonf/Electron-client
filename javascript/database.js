const json = require("jsonfile");

module.exports = {
  storeJson(folder, name, executable) {
    let folderToSave = path.resolve(
      __dirname + `/../json/${name.slice(0, name.lastIndexOf("."))}.json`
    );
    console.log(folderToSave);
    let data = { folder: folder, name: name, exec: executable };
    json.writeFileSync(folderToSave, data);
  },
};
