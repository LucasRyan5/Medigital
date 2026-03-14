// lista-prontuarios.js - Gestão de Histórico Medigital

document.addEventListener('DOMContentLoaded', () => {
    const inputBusca = document.querySelector('input[placeholder*="Buscar"]');
    const selectStatus = document.querySelector('select');
    const tabelaCorpo = document.querySelector('tbody');
    const linhas = tabelaCorpo.querySelectorAll('tr');

    // 1. Lógica de Busca em Tempo Real (Filtro por Nome ou CPF)
    inputBusca.addEventListener('input', () => {
        const termo = inputBusca.value.toLowerCase();
        filtrarTabela();
    });

    // 2. Filtro por Status (Finalizado / Em Aberto)
    selectStatus.addEventListener('change', () => {
        filtrarTabela();
    });

    function filtrarTabela() {
        const termoBusca = inputBusca.value.toLowerCase();
        const statusFiltro = selectStatus.value;

        linhas.forEach(linha => {
            const textoPaciente = linha.querySelector('.font-bold').innerText.toLowerCase();
            const textoCPF = linha.querySelector('.text-xs').innerText.toLowerCase();
            const textoStatus = linha.querySelector('span').innerText;

            const bateBusca = textoPaciente.includes(termoBusca) || textoCPF.includes(termoBusca);
            const bateStatus = (statusFiltro === "Status: Todos") || (textoStatus === statusFiltro);

            if (bateBusca && bateStatus) {
                linha.style.display = "";
            } else {
                linha.style.display = "none";
            }
        });
    }

    // 3. Simulação de Ações (Visualizar e Imprimir)
    tabelaCorpo.addEventListener('click', (e) => {
        const botao = e.target.closest('button');
        if (!botao) return;

        const linha = botao.closest('tr');
        const nomePaciente = linha.querySelector('.font-bold').innerText;

        if (botao.title === "Visualizar") {
            alert(`Abrindo visualização completa do prontuário de: ${nomePaciente}`);
            // Aqui você redirecionaria para a visualização: window.location.href = `ver-prontuario.html?id=...`
        }

        if (botao.title === "Imprimir PDF") {
            const icon = botao.querySelector('i');
            icon.className = "fas fa-spinner fa-spin"; // Feedback de carregamento
            
            setTimeout(() => {
                alert(`Gerando PDF do histórico de ${nomePaciente}...`);
                icon.className = "fas fa-print";
            }, 1500);

            document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    gerarPDF();
});
        }

        if (botao.title === "Retomar") {
            window.location.href = "prontuario.html"; // Simula a edição
        }
    });

    // 4. Feedback de Exportação
    const btnExportar = document.querySelector('button:contains("Exportar")') || document.querySelector('header button');
    btnExportar.addEventListener('click', () => {
        alert("Preparando planilha Excel com os registros filtrados...");
    });
});
