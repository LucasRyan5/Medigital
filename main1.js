function loginGovBr() {
        // Na vida real, aqui você redireciona para a URL de autorização do Gov.br
        // Exemplo: https://sso.staging.acesso.gov.br/authorize?response_type=code&client_id=...
        alert("Redirecionando para o ambiente de autenticação segura do Gov.br...");
        
        // Simulação de fluxo:
        const clientId = "seu_client_id_aqui";
        const redirectUri = encodeURIComponent("https://suaplataforma.com.br/callback");
        const scope = "openid+email+profile+govbr_confiabilidade";
        
        const authUrl = `https://acesso.gov.br/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
};
function loginGovBr() {
    window.open("https://acesso.gov.br/", "_blank");
}
//Essa merda não está linkando com o GOV.BR talvez porque eu seja burro....
// main1.js - Lógica de Login Medigital

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    
    // Configuração de credenciais de teste (Protótipo)
    const CREDENCIAIS_VALIDAS = {
        crm: "123456-SP",
        senha: "admin"
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio real do formulário

        // Captura os inputs
        const inputCRM = loginForm.querySelector('input[type="text"]');
        const inputSenha = loginForm.querySelector('input[type="password"]');
        
        const crmValue = inputCRM.value.trim();
        const senhaValue = inputSenha.value;

        // Remove mensagens de erro anteriores, se existirem
        const erroAnterior = document.getElementById('erro-login');
        if (erroAnterior) erroAnterior.remove();

        // VALIDAÇÃO
        if (crmValue === CREDENCIAIS_VALIDAS.crm && senhaValue === CREDENCIAIS_VALIDAS.senha) {
            // SUCESSO
            const btn = loginForm.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Autenticando...';
            btn.classList.replace('bg-blue-700', 'bg-green-600');
            
            setTimeout(() => {
                alert("Login realizado com sucesso! Bem-vindo, Dr(a).");
                // Aqui você redirecionaria para a página de cadastro ou prontuário
                // window.location.href = "cadastro.html"; 
            }, 1000);

        } else {
            // ERRO
            exibirErro("CRM ou Senha incorretos. Verifique os dados e tente novamente.");
            
            // Efeito visual de erro nos campos
            inputCRM.classList.add('border-red-500', 'bg-red-50');
            inputSenha.classList.add('border-red-500', 'bg-red-50');
            
            // Remove o efeito de erro após o usuário voltar a digitar
            [inputCRM, inputSenha].forEach(input => {
                input.addEventListener('input', () => {
                    input.classList.remove('border-red-500', 'bg-red-50');
                }, { once: true });
            });
        }
    });
});

// Função para criar o alerta de erro no navegador
function exibirErro(mensagem) {
    const container = document.querySelector('form');
    const erroDiv = document.createElement('div');
    
    erroDiv.id = "erro-login";
    erroDiv.className = "bg-red-50 border-l-4 border-red-500 p-4 mb-6 animate-bounce";
    erroDiv.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <i class="fas fa-exclamation-circle text-red-500"></i>
            </div>
            <div class="ml-3">
                <p class="text-sm text-red-700 font-medium">${mensagem}</p>
            </div>
        </div>
    `;
    
    // Insere o erro logo no início do formulário
    container.prepend(erroDiv);
}

// Função para o botão do Gov.br (Ambiente de Teste)
function loginGovBr() {
    console.log("Iniciando requisição de autenticação Gov.br...");
    const homologacaoUrl = "https://sso.staging.acesso.gov.br/";
    
    if(confirm("Você será redirecionado para o ambiente de TESTES do Gov.br. Deseja continuar?")) {
        window.open(homologacaoUrl, "_blank");
    }
}