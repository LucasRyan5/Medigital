document.addEventListener('DOMContentLoaded', () => {
    const recoverForm = document.getElementById('recoverForm');
    const btnRecover = document.getElementById('btnRecover');
    const successModal = document.getElementById('successModal');

    recoverForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Efeito de carregamento no botão
        const originalText = btnRecover.innerHTML;
        btnRecover.disabled = true;
        btnRecover.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Verificando base...';

        // 2. Simulação de requisição ao servidor
        setTimeout(() => {
            // Esconde o formulário e mostra o modal de sucesso
            successModal.classList.remove('hidden');
            
            // Log para o protótipo
            const valorInformado = document.getElementById('userInput').value;
            console.log(`Solicitação de recuperação para: ${valorInformado}`);
            
            // Reseta o botão (caso o usuário feche o modal)
            btnRecover.innerHTML = originalText;
            btnRecover.disabled = false;
        }, 2000);
    });
});