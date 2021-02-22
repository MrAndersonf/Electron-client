const fs = require("fs");
const path = require("path");
const utils = require(path.resolve(__dirname + "/../javascript/utils.js"));
require("dotenv").config();

const shell = require("shelljs");
const Client = require("socket.io-client");
const cp = require("child_process");
const decompress = require("decompress");
const { ipcRenderer } = require("electron");
const templates = require(path.resolve(
  __dirname + "/../javascript/templates.js"
));
const database = require(path.resolve(
  __dirname + "/../javascript/database.js"
));
const serverStream = require("socket.io-stream");

const socket = Client.connect(`${process.env.hostHTTP}:${process.env.port}`);

const Computer = process.env.COMPUTERNAME;
const Scripts = path.resolve(__dirname + `/../scripts/`);
const Extracted = path.resolve(__dirname + `/../extracted/`);
const Json = path.resolve(__dirname + `/../json/`);

$(window).on("load", () => {
  setUpSystem();
  database.storeJson(
    path.resolve(__dirname + `/../extracted/44.json`),
    "44",
    "index.js"
  );
});

socket.on("connect", function () {
  socket.on("identify-client", () => {
    socket.emit("client-socket-connection", {
      computer: Computer,
      scripts: utils.storedScripts(),
    });
  });

  socket.on("server-generated-identification", (id) => {
    $("#socketId").text(id);
  });

  socket.on("administrator-demands-run", ({ script, instances }) => {
    $(`#${script}`).val(instances);
    executeInstancesSocket(instances, script);
  });

  socket.on("broadcast", function (e) {
    $("#processAtivityTable").children().remove();
    e.forEach((el, i) => {
      $("#processAtivityTable").append(
        templates.processTableRow(el.id, el.computer, "ss", "running")
      );
    });
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

  socket.on("server-download-new-script", () => {
    serverStream(socket).emit("client-request-file");
    socket.emit("client-downloading-script", { computer: Computer });
  });

  serverStream(socket).on(
    "server-sending-requested-file",
    (stream, { name, exec }) => {
      try {
        let folder = Scripts + "/" + name;
        stream.pipe(fs.createWriteStream(folder));
        stream.on("end", function () {
          socket.emit("client-decompressing-script", { computer: Computer });
          setTimeout(() => {
            unzip(folder, exec);
            setUpSystem();
            setUpSystem();
          }, 1000);
        });
      } catch (error) {}
    }
  );
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

async function unzip(origin, exec) {
  socket.emit("client-dependencies-script", { computer: Computer });
  const files = await decompress(origin, Extracted);
  try {
    await execute(Extracted + "/" + files[0].path);
  } catch (err) {
    console.log(error);
    socket.emit("client-error-on-installing", {
      computer: Computer,
      error: err,
    });
  }
  await database.storeJson(
    path.resolve(__dirname + `/../extracted/${files[0].path}`),
    files[0].path,
    exec
  );
  socket.emit("client-successfuly-install-script", {
    computer: Computer,
    scripts: utils.storedScripts(),
  });
}

function execute(dir) {
  try {
    shell.cd(dir);
    shell.config.execPath = String(shell.which("node"));
    shell.exec(`yarn install`);
  } catch (err) {
    socket.emit("client-error-on-installing", {
      computer: Computer,
      error: err,
    });
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

function localScripts() {
  let savedScripts = [];
  try {
    let files = fs.readdirSync(Extracted);
    files.forEach((el, i) => {
      let cont = fs.readdirSync(
        path.resolve(__dirname + `/../extracted/${el}`)
      );
      savedScripts.push({ folder: el, content: cont });
    });
    return savedScripts;
  } catch (error) {
    console.log("dsda", error);
  }
}
