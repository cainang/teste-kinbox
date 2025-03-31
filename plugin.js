/********************
 * Variáveis globais
 ********************/
var conversation;
var workspaceInfo = null;

/********************
 * Eventos
 ********************/

Kinbox.on("conversation", function (data) {
    conversation = data
    console.log("on conversation", data)

    getWorkspaceInfo()
})

Kinbox.on("no_conversation", function (data) {
    conversation = null
    console.log("on no-conversation", data)
})

//Kinbox.on("callback", function (data) {
//    console.log("on callback", data)
//    if (data.key === "idade-changed") {
//        Kinbox.loading(false)
//        if (data.success) {
//            Kinbox.toast("success", "Alterou idade com sucesso")
//        } else {
//            Kinbox.toast("error", "Erro ao alterar idade")
//        }
//    }
//})

/********************
 * Exemplos
 ********************/
function loading() {
    Kinbox.loading(true)
    setTimeout(() => {
        Kinbox.loading(false)
    }, 2000)
}

async function dialog(msg, callback = () => {}) {
    Kinbox.dialog(
        "confirm",
        {
            title: "Você confirma?",
            description: msg,
            okText: "Confirmar",
            cancelText: "Cancelar",
        },
        async function (confirmed) {
            if (confirmed) {
                // Realizar alguma ação, como por exemplo uma requisição http
                callback();
            } else {
                //Kinbox.toast("error", "Você cancelou e não quis realizar a ação")
            }
        }
    )
}

async function toast() {
    Kinbox.toast("success", "Toast de sucesso")
    setTimeout(() => {
        Kinbox.toast("info", "Toast de info")
    }, 500)
    setTimeout(() => {
        Kinbox.toast("warning", "Toast de warning")
    }, 1000)
    setTimeout(() => {
        Kinbox.toast("error", "Toast de error")
    }, 1500)
}

async function criarCliente() {
    await dialog('Você deseja criar esse cliente no sysled?', sendCliente);
}

async function sendCliente() {
    try {
        Kinbox.loading(true)
        let data = await fetch("https://meowfacts.herokuapp.com/?count=3")
        let response = await data.json();
        console.log(response);
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('auth_secret');
        console.log(myParam);
        Kinbox.loading(false)
        Kinbox.toast("success", "Cliente adicionado com sucesso!")
    } catch (e) {
        Kinbox.toast("error", e.message)
    }
}

function getWorkspaceInfo() {
    // Obter informações do workspace
    Kinbox.getWorkspaceInfo(async function (data) {
        console.log("on workspaceInfo", data)
        workspaceInfo = data
    })
}


