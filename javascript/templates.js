const icon = require(path.resolve(__dirname + "/../icons/index.js"));

module.exports = {
  processTableRow(pid, computer, script, status) {
    return `
        <tr>
            <td>${pid}</td>
            <td>${computer}</td>
            <td>${script}</td>
            <td>${status}</td>
            <td>
                <div class="actionButtomsSection">
                    <button class="customBtnAction">${icon.trash()}</button>
                    <button class="customBtnAction" onclick="play()">
                        ${icon.play()}
                    </button>
                    <button class="customBtnAction">${icon.pause()}</button>
                </div>
            </td>
        </tr>
        `;
  },
  loadingTableRow(pid, computer, script, status) {
    return `
        <tr>
            <td>${pid}</td>
            <td>${computer}</td>
            <td>${script}</td>
            <td>${status}</td>
        </tr>
        `;
  },
  scripts(id, script) {
    return `
        <tr>
            <td>${id}</td>
            <td>${script}</td>
            <td"><div><input id="${script}style="border: transparent" type="number" value="0" min="0" step="1"/></div></td>
            <td>Parado</td>
            <td>
            <div class="actionButtomsSection">
                    <button class="customBtnAction">${icon.trash()}</button>
                    <button class="customBtnAction" onclick="event.preventDefault;executeInstances(2,'${script}')">
                        ${icon.play()}
                    </button>
                    <button class="customBtnAction">${icon.pause()}</button>
                </div></td>
        </tr>
        `;
  },
};
