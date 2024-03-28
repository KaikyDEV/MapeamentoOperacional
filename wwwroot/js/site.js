document.addEventListener("DOMContentLoaded", function () {
    // Função para limpar o conteúdo da tabela
    function clearErrorTable() {
        let errorTable = document.getElementById("error-table").getElementsByTagName("tbody")[0];
        errorTable.innerHTML = ""; // Remove todas as linhas da tabela
    }

    const quadrados = document.querySelectorAll("#quadradoAzul");

    quadrados.forEach(quadrado => {
        let clicks = 0;

        quadrado.addEventListener("click", () => {
            const id = quadrado.getAttribute("data-id");
            let status = "";

            if (clicks === 0) {
                status = "Ativo";
            } else if (clicks === 1) {
                status = "Banido";
            } else if (clicks === 2) {
                status = "Suporte";
            } else if (clicks === 3) {
                status = "Banido/Suporte";
            }

            quadrado.style.backgroundColor = statusColor(status);
            localStorage.setItem(id, status);

            clicks = (clicks + 1) % 4; // Reinicia para zero depois de atingir 3
        });

        const id = quadrado.getAttribute("data-id");
        const statusSalvo = localStorage.getItem(id);

        if (statusSalvo) {
            quadrado.style.backgroundColor = statusColor(statusSalvo);
        }
    });

    // Adicionando evento de clique para o botão de relatar erros
    const btnsReportError = document.querySelectorAll("button[data-id]");
    btnsReportError.forEach(btn => {
        btn.addEventListener("click", () => {
            let errosSelecionados = [];

            quadrados.forEach(quadrado => {
                const id = quadrado.getAttribute("data-id");
                const status = localStorage.getItem(id);
                if (status && status !== "blue" && status !== "Funcionando" && status !== "Ativo") {
                    errosSelecionados.push({ id: id, status: status });
                }
            });

            // Redireciona para a página de lista de erros com os dados como parâmetros de consulta
            let queryString = errosSelecionados.map(erro => `${encodeURIComponent(erro.id)}=${encodeURIComponent(erro.status)}`).join("&");
            window.location.href = "ListaDeErros?" + queryString;
        });
    });

    // Função para converter a cor para o status correspondente
    function statusColor(status) {
        switch (status) {
            case "Ativo":
                return "blue";
            case "Banido":
                return "orange";
            case "Suporte":
                return "yellow";
            case "Banido/Suporte":
                return "red";
            default:
                return "blue"; // Defina azul como padrão para status desconhecidos
        }
    }

    // Função para obter parâmetros de consulta da URL
    function getQueryParams() {
        let params = {};
        let queryString = window.location.search.substring(1);
        let pairs = queryString.split("&");
        pairs.forEach(pair => {
            let [key, value] = pair.split("=");
            params[decodeURIComponent(key)] = decodeURIComponent(value);
        });
        return params;
    }

    // Função para adicionar entradas na tabela com base nos parâmetros de consulta
    function addEntriesToTable(params) {
        let errorTable = document.getElementById("error-table").getElementsByTagName("tbody")[0];

        for (const id in params) {
            if (params[id] !== "blue" && params[id] !== "Funcionando" && params[id] !== "Ativo") { // Adiciona apenas se não for azul, "Funcionando" ou "Ativo"
                let newRow = errorTable.insertRow();
                newRow.insertCell().appendChild(document.createTextNode(id));
                newRow.insertCell().appendChild(document.createTextNode(params[id]));
                newRow.insertCell().innerHTML = '<button onclick="deleteError(this)">Deletar</button>';
            }
        }
    }

    // Obter os parâmetros de consulta da URL
    let queryParams = getQueryParams();

    // Adicionar as entradas na tabela
    addEntriesToTable(queryParams);
});

// Função para excluir uma linha da tabela
function deleteError(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);

    localStorage.clear(row);
}