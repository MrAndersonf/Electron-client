const fs = require("fs");

module.exports = {
  storedScripts() {
    let storeds = [];
    try {
      let scripts = fs.readdirSync(Extracted);
      scripts.forEach((script, i) => {
        let name = fs.readdirSync(
          path.resolve(__dirname + `/../extracted/${script}`)
        );
        storeds.push({ folder: script, content: name });
      });
      return storeds;
    } catch (error) {
      return { error: error };
    }
  },
};
