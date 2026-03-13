// Main3.js - Lógica do Prontuário Medigital 2026

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const historicoItens = document.querySelectorAll('aside div.cursor-pointer');
    
    // 1. Interatividade do Histórico Lateral
    historicoItens.forEach(item => {
        item.addEventListener('click', () => {
            const data = item.querySelector('p.text-blue-800, p.text-gray-700').innerText;
            alert(`Carregando detalhes da consulta de: ${data}`);
            // Aqui você poderia buscar dados via API e preencher o formulário
        });
    });

    // 2. Validação Simples de Sinais Vitais (Alertas Visuais)
    const inputPA = document.querySelector('input[placeholder="120/80"]');
    const inputTemp = document.querySelector('input[placeholder="36.5"]');

    inputTemp.addEventListener('blur', (e) => {
        const temp = parseFloat(e.target.value);
        if (temp >= 37.8) {
            e.target.classList.add('border-red-500', 'text-red-600');
            console.warn("Alerta: Paciente com estado febril.");
        } else {
            e.target.classList.remove('border-red-500', 'text-red-600');
        }
    });

    // 3. Lógica de Finalização do Atendimento
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Captura os dados das seções
        const qp = form.querySelector('input[placeholder*="Ex: Dor"]').value;
        const hma = form.querySelector('textarea[placeholder*="Descreva"]').value;
        const alergias = form.querySelector('section.bg-red-50 textarea').value;

        if (!qp || !hma) {
            alert("Por favor, preencha a Queixa Principal e a HMA antes de finalizar.");
            return;
        }

        // Simulação de Gerar Receita/Relatório
        console.log("--- RELATÓRIO FINAL ---");
        console.log(`Paciente: João das Neves`);
        console.log(`QP: ${qp}`);
        console.log(`HMA: ${hma}`);
        console.log(`Sinais Vitais: PA ${inputPA.value}, Temp ${inputTemp.value}°C`);
        console.log(`Alertas: ${alergias || "Nenhum"}`);

        const confirmar = confirm("Deseja finalizar o atendimento e gerar o PDF da receita?");
        if (confirmar) {
            alert("Atendimento finalizado com sucesso! O documento foi enviado para a fila de impressão.");
            // form.reset();
        }
    });

    // 4. Botão "Pausar"
    const btnPausar = form.querySelector('button[type="button"]');
    btnPausar.addEventListener('click', () => {
        alert("Atendimento pausado. Os dados foram salvos temporariamente no sistema.");
    });
});