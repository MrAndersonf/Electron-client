const { ipcRenderer } = require('electron');
const cp = require('child_process')
const shell = require('shelljs')
const path = require('path');
const { title } = require('process');
const jsonDatabase = require(path.resolve(__dirname + '/../scripts/index.js'))
const template = require(path.join(__dirname + '/../assets/javascript/templates.js'))

$(window).on('load', () => {
  populateScriptsTable();
});

function populateScriptsTable() {
  jsonDatabase.scripts().forEach((el, i) => {
    $('#processAtivityTable')
      .append(template.processTableRow(i, el.name, el.author, el.description, el.exec))
  });
}

function notify(title, msg) {
  let notification = new Notification(title, {
    body: msg
  });
}

function getFolderPath() {
  ipcRenderer.send('read-script-path')
}

function enableButtons() {
  const buttons = ['execPath', 'scriptName', 'scriptDesc', 'scriptAuthor']
  buttons.forEach((el, i) => {
    $(`#${el}`).attr('disabled', false)
  })
  $(`#${buttons[0]}`).trigger('focus')
}

function disableButtons() {
  const buttons = ['folderPath', 'folderName']
  buttons.forEach(el => {
    $(`#${el}`).attr('disabled', true)
  })
}

ipcRenderer.on('selected-script-file', (event, pathToFile) => {
  if (pathToFile != false) {
    $("#folderPath").val(pathToFile);
    $("#folderName").trigger('focus');
  } else {
    notify("Erro!", "Erro ao buscar caminho do arquivo.")
  }
})

function getScriptExecFile() {
  ipcRenderer.send('read-executable-path', $("#folderName").val())
}

ipcRenderer.on('selected-executable-file', (event, execFile) => {
  $("#execPath").val(execFile);

})

function copyFolder() {
  let name = $("#folderName");
  let folderOrigin = $("#folderPath")
  if (name.val().length > 0 && folderOrigin.val().length > 5) {
    jsonDatabase.copyDiretory($("#folderPath").val(), $("#folderName").val())
      .then(() => {
        notify("Sucesso", "Diretório copiado com sucesso");
        enableButtons();
        disableButtons();
      })
      .catch((err) => {
        notify("Erro", err);
      })
  } else {
    notify("Aviso", "Parâmetros inválidos");
  }


}


function copyAndSaveFolderScript() {
  let exec = $("#execPath");
  let name = $("#folderName");
  let description = $("#scriptDesc");
  let author = $("#scriptAuthor");
  if (exec.val() === '' || name.val() === '') {
    let notify = new Notification('Aviso', {
      body: "Existem campos obrigatórios não preenchidos."
    })
  } else {
    jsonDatabase.saveNewScript(name.val(), {
      exec: exec.val(),
      name: name.val(),
      description: description.val(),
      author: author.val(),
    });
    exec.val('');
    name.val('');
    description.val('');
    author.val('');
    $('#addScript').modal('hide')
    populateScriptsTable()
  }
}

async function veryfy(s, process) {
  let c = ['D']

  let data = Buffer.from(s).toString('utf8')

  switch (data) {
    case `${c[0]}`:
      process.kill('SIGKILL')
      break;
    default:
      console.log(data)
      break;
  }


}

async function executeScript(file) {
  let exct = jsonDatabase.findScript(file)
  console.log(exct)

  let processIdentification = await cp.spawn('node', [`${exct}`]);

  await processIdentification.stdout.on("data", function(data) {

    veryfy(data, processIdentification)

  })
  await processIdentification.stdout.on("message", function(data) {

  })


  await processIdentification.stdout.on("error", function(data) {
    veryfy(data)
  })

  await processIdentification.stdout.on("exit", function(data) {
    veryfy(data)
  })

  await processIdentification.stdout.on("code", function(data) {
    veryfy(data)
  })
}