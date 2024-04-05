document.addEventListener("DOMContentLoaded", function () {
    // Função para limpar o conteúdo da tabela
    function clearErrorTable() {
        let errorTable = document.getElementById("error-table").getElementsByTagName("tbody")[0];
        errorTable.innerHTML = ""; // Remove todas as linhas da tabela
    }

    // Função para adicionar entradas na tabela com base nos dados armazenados no localStorage
    function addEntriesFromLocalStorage() {
        let errorTable = document.getElementById("error-table");
        if (errorTable) {
            let tbody = errorTable.getElementsByTagName("tbody")[0];
            if (tbody) {
                // Limpar a tabela antes de adicionar novas entradas
                tbody.innerHTML = "";
                // Loop através dos itens no localStorage
                for (let i = 0; i < localStorage.length; i++) {
                    let id = localStorage.key(i); // Obter o ID do erro
                    let status = localStorage.getItem(id); // Obter o status do erro
    
                    // Verificar se o status é válido, não é "blue" ou "Funcionando", e não é "Ativo"
                    if (status && status !== "blue" && status !== "Funcionando" && status !== "Ativo") {
                        let newRow = tbody.insertRow();
                        newRow.insertCell().appendChild(document.createTextNode(id)); // Espaço reservado para o erro (não está disponível no localStorage)
                        newRow.insertCell().appendChild(document.createTextNode(status)); // Adicionar o status
                        newRow.insertCell().appendChild(document.createTextNode(getCurrentDateTime())); // Adicionar a data/hora atual
                        const deleteCell = newRow.insertCell();
    
                        // Adicionar o botão de exclusão à coluna de ações
                        const deleteButton = document.createElement("button");
                        deleteButton.textContent = "Deletar";
                        deleteButton.onclick = function () {
                            deleteError(newRow);
                        };
                        deleteCell.appendChild(deleteButton);
    
                        // Verificar se o elemento com o ID existe antes de acessá-lo
                        let element = document.getElementById(id);
                        let dataId = element ? element.getAttribute("data-id") : "";
    
                        // Adicionar o data-id à célula da tabela
                        newRow.insertCell().appendChild(document.createTextNode(dataId));
                    }
                }
            } else {
                console.error("TBody not found in error table.");
            }
        } else {
            console.error("Error table not found.");
        }
    }

    // Função para converter a cor para o status correspondente
    function statusColor(status) {
        switch (status) {
            case "Ativo":
                return "blue"; // Azul para "Ativo"
            case "Suporte":
                return "yellow"; // Amarelo para "Suporte"
            case "Banido":
                return "orange"; // Laranja para "Banido"
            case "Banido/Suporte":
                return "red"; // Vermelho para "Banido/Suporte"
            default:
                return "blue"; // Por padrão, define como azul
        }
    }

    // Função para obter a data e hora atual no formato "dd/mm/aaaa hh:mm:ss"
    function getCurrentDateTime() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    // Função para excluir uma linha da tabela
    function deleteError(row) {
        row.parentNode.removeChild(row);
    }

    // Adicione a lógica de alteração de cor para os quadrados
    const quadrados = document.querySelectorAll("#quadradoAzul");
    quadrados.forEach(quadrado => {
        let clicks = 0;

        quadrado.addEventListener("click", () => {
            const id = quadrado.getAttribute("data-id");
            let status = "";

            if (clicks === 0) {
                status = "Ativo";
            } else if (clicks === 1) {
                status = "Suporte";
            } else if (clicks === 2) {
                status = "Banido";
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
            // Verifica se o statusSalvo é um dos status específicos
            if (["Ativo", "Suporte", "Banido", "Banido/Suporte"].includes(statusSalvo)) {
                // Se for, aplica a cor correspondente
                quadrado.style.backgroundColor = statusColor(statusSalvo);
            } else {
                // Caso contrário, aplica a cor azul (padrão)
                quadrado.style.backgroundColor = "blue";
            }
        }
    });

    // Chame a função para adicionar entradas da localStorage à tabela ao carregar a página
    addEntriesFromLocalStorage();
});