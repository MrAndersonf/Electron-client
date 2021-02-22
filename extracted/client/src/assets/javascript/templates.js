const icon = require(path.resolve(__dirname + '/../icons/index.js'));

module.exports = {
  processTableRow(index, script, author, description) {

    return `
        <tr>
            <td>${index}</td>
            <td>${script}</td>
            <td>${author}</td>
            <td>${description}</td>
            <td>
                <div class="actionButtomsSection">
                    <button class="customBtnAction">${icon.trash()}</button>
                    <button class="customBtnAction" onclick="event.preventDefault(); executeScript('${script}')">
                        ${icon.play()}
                    </button>
                    <button class="customBtnAction">${icon.pause()}</button>
                </div>
            </td>
        </tr>
        `;
  },
}