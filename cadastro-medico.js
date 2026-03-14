document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('medicoForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Coleta de dados
        const medico = {
            nome: document.getElementById('nome').value,
            crm: document.getElementById('crm').value,
            uf: document.getElementById('uf').value,
            especialidade: document.getElementById('especialidade').value,
            email: document.getElementById('email').value
        };

        // Validação Simples de CRM (apenas números)
        const crmRegex = /^\d+$/;
        if (!crmRegex.test(medico.crm)) {
            alert("Erro: O CRM deve conter apenas números.");
            return;
        }

        // Simulação de Processamento
        const btnSubmit = form.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerHTML;
        
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Cadastrando...';

        setTimeout(() => {
            console.log("Médico Cadastrado com Sucesso:", medico);
            
            // Feedback de Sucesso
            alert(`O Dr(a). ${medico.nome} foi cadastrado com sucesso e está ativo no sistema!`);
            
            // Limpa o formulário e reseta botão
            form.reset();
            btnSubmit.innerHTML = originalText;
            btnSubmit.disabled = false;
            
            // Redireciona para o dashboard (opcional)
            // window.location.href = 'dashboard.html';
        }, 1500);
    });
});