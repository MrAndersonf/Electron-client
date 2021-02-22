const icon = require(path.resolve(__dirname + '/../icons/index.js'));

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
}