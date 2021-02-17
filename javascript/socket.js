const fs = require("fs");
require("dotenv").config();
const path = require("path");
const shell = require("shelljs");
const Client = require("socket.io-client");
const cp = require("child_process");
const decompress = require("decompress");
const { ipcRenderer } = require("electron");
const templates = require(path.resolve(
  __dirname + "/../javascript/templates.js"
));

const IOstream = require("socket.io-stream");

const socket = Client.connect(`${process.env.hostHTTP}:${process.env.port}`);

const Computer = process.env.COMPUTERNAME;
const Scripts = path.resolve(__dirname + `/../scripts/`);
const Extracted = path.resolve(__dirname + `/../extracted/`);

$(window).on("load", () => {
  setUpSystem();
});

function localScripts() {
  let local = [];
  try {
    let files = fs.readdirSync(Extracted);

    files.forEach((el, i) => {
      let cont = fs.readdirSync(
        path.resolve(__dirname + `/../extracted/${el}`)
      );
      local.push({ folder: el, content: cont });
    });
    return local;
  } catch (error) {
    console.log("dsda", error);
  }
}

socket.on("connect", function () {
  let localS = localScripts();
  socket.on("identify", () => {
    socket.emit("identification", { computer: Computer, scripts: localS });
  });

  socket.on("adm_instruction", (data) => {
    $(`#${data.script}`).val(data.instances);
    executeInstancesSocket(data.instances, data.script);
  });

  socket.on("broadcast", function (e) {
    $("#processAtivityTable").children().remove();
    e.forEach((el, i) => {
      $("#processAtivityTable").append(
        Template.processTableRow(el.id, el.computer, "ss", "running")
      );
    });
  });

  IOstream(socket).on("sinc", function (stream, name) {
    try {
      let filename = Scripts + "/" + name;
      stream.pipe(fs.createWriteStream(filename));
      stream.on("end", function () {
        socket.emit("extracting", Computer);
        unzip(filename);
        setUpSystem();
      });
    } catch (error) {}
  });

  socket.on("each", () => {
    let directory = [];
    try {
      let files = fs.readdirSync(Extracted);

      files.forEach((el, i) => {
        let cont = fs.readdirSync(
          path.resolve(__dirname + `/../extracted/${el}`)
        );
        directory.push({ folder: el, content: cont });
      });
      socket.emit("result", directory);
    } catch (error) {
      console.log("dsda", error);
    }
  });

  socket.on("repo-link", (data) => {
    try {
      const file = Extracted;
      shell.cd(file);
      shell.config.execPath = String(shell.which("node"));
      shell.exec(`git clone ${data.url}`);
      execute(file);
      setUpSystem();
    } catch (error) {}
  });

  socket.on("down", () => {
    console.log("Socket on down");
    IOstream(socket).emit("sincronize");
  });

  socket.on("done", () => {
    notify("Sucesso", "arquivo Carregado no servidor");
    $("#sincronize").attr("disabled", false);
  });
});

function notify(title, msg) {
  let notification = new Notification(title, {
    body: msg,
  });
}

let directory = $("#directory");
let executable = $("#executable");
let name = $("#name");

function originDirectory() {
  ipcRenderer.send("originDirectory");
}

ipcRenderer.on("originDirectory-reply", (event, pathToFile) => {
  if (pathToFile != false) {
    directory.val(pathToFile);
    executable.trigger("focus");
  } else {
    notify("Erro!", "Erro ao buscar caminho do arquivo.");
  }
});

function executableInDirectory() {
  ipcRenderer.send("executableInDirectory", executable.val());
}

ipcRenderer.on("executableInDirectory-reply", (event, execFile) => {
  executable.val(execFile);
  name.trigger("focus");
});

async function unzip(origin) {
  try {
    const files = await decompress(origin, Extracted);
    await execute(Extracted + "/" + files[0].path);
    socket.emit("success-in-node", { computer: Computer });
  } catch (err) {
    console.log("unzip");
    socket.emit("error-in-node", { computer: Computer, error: err });
  }
}

function execute(dir) {
  try {
    socket.emit("dependencies-in-node", { computer: Computer });
    shell.cd(dir);
    shell.config.execPath = String(shell.which("node"));
    shell.exec(`yarn install`);
  } catch (err) {
    socket.emit("error-in-node", { computer: Computer, error: err });
  }
}

function setUpSystem() {
  let directory = [];
  try {
    let files = fs.readdirSync(Extracted);

    files.forEach((el, i) => {
      let cont = fs.readdirSync(
        path.resolve(__dirname + `/../extracted/${el}`)
      );
      directory.push({ folder: el, content: cont });
    });
    console.log(directory);
    $("#scriptsTable").children().remove();
    directory.forEach((el, i) => {
      $("#scriptsTable").append(templates.scripts(i, el.folder));
    });
  } catch (error) {
    console.log("dsda", error);
  }
  return;
}

function executeInstances(file) {
  let times = $(`#file`).val();
  for (let index = 0; index < times; index++) {
    executeScript(file);
  }
}

function executeInstancesSocket(times, file) {
  for (let index = 0; index < times; index++) {
    executeScript(file);
  }
}

async function executeScript(file) {
  let processIdentification = await cp.spawn("node", [
    `${path.resolve(__dirname + "/../extracted/" + file + "/index.js")}`,
  ]);

  await processIdentification.stdout.on("data", function (data) {
    veryfy(data, processIdentification);
  });
  await processIdentification.stdout.on("message", function (data) {});

  await processIdentification.stdout.on("error", function (data) {
    veryfy(data);
  });

  await processIdentification.stdout.on("exit", function (data) {
    veryfy(data);
  });

  await processIdentification.stdout.on("code", function (data) {
    veryfy(data);
  });
}

async function veryfy(s, process) {
  let c = ["D"];

  let data = Buffer.from(s).toString("utf8");

  switch (data) {
    case `${c[0]}`:
      process.kill("SIGKILL");
      break;
    default:
      console.log(data);
      break;
  }
}
