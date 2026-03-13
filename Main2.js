// Main2.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const btnLimpar = form.querySelector('button[type="button"]:nth-of-type(1)');
    
    // --- 1. Máscaras de Input ---
    
    const aplicarMascara = (seletor, callback) => {
        const input = document.querySelector(`input[placeholder="${seletor}"]`);
        if (input) {
            input.addEventListener('input', (e) => {
                e.target.value = callback(e.target.value);
            });
        }
    };

    // Máscara CPF: 000.000.000-00
    const mascaraCPF = (v) => {
        return v.replace(/\D/g, "").slice(0, 11)
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    // Máscara Telefone: (00) 00000-0000
    const mascaraTel = (v) => {
        return v.replace(/\D/g, "").slice(0, 11)
                .replace(/^(\d{2})(\d)/g, "($1) $2")
                .replace(/(\d{5})(\d)/, "$1-$2");
    };

    // Máscara CEP: 00000-000
    const mascaraCEP = (v) => {
        return v.replace(/\D/g, "").slice(0, 8)
                .replace(/(\d{5})(\d)/, "$1-$2");
    };

    aplicarMascara("000.000.000-00", mascaraCPF);
    aplicarMascara("(00) 00000-0000", mascaraTel);
    aplicarMascara("00000-000", mascaraCEP);

    // --- 2. Lógica do Formulário ---

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Verificar se o termo da LGPD foi aceito
        const termos = document.getElementById('termos');
        if (!termos.checked) {
            alert("É necessário aceitar os termos da LGPD para continuar.");
            return;
        }

        // Captura de dados (Exemplo simplificado)
        const formData = new FormData(form);
        const dados = Object.fromEntries(formData.entries());

        // Simulação de Salvamento
        console.log("Enviando dados do paciente:", dados);
        
        alert("Cadastro de paciente salvo com sucesso!");
        // form.reset(); // Opcional: limpa o formulário após salvar
    });

    // Botão Limpar
    btnLimpar.addEventListener('click', () => {
        if (confirm("Tem certeza que deseja limpar todos os campos?")) {
            form.reset();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleção dos campos (usando placeholders como referência do seu HTML)
    const campoCep = document.querySelector('input[placeholder="00000-000"]');
    const campoEndereco = document.querySelector('input[placeholder="Rua, Número, Bairro"]');
    // O campo Cidade/Estado é o último input antes da seção de convênio
    const campoCidadeEstado = document.querySelector('input[placeholder="Rua, Número, Bairro"]').parentElement.nextElementSibling.querySelector('input');

    // 2. Função de Busca de CEP
    if (campoCep) {
        campoCep.addEventListener('blur', async () => {
            // Remove caracteres não numéricos
            const cep = campoCep.value.replace(/\D/g, '');

            if (cep.length === 8) {
                try {
                    // Feedback visual de carregamento
                    campoEndereco.value = "Buscando...";
                    
                    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    const dados = await response.json();

                    if (!dados.erro) {
                        campoEndereco.value = `${dados.logradouro}, ${dados.bairro}`;
                        campoCidadeEstado.value = `${dados.localidade} / ${dados.uf}`;
                    } else {
                        alert("CEP não encontrado.");
                        limparCamposEndereco();
                    }
                } catch (error) {
                    console.error("Erro ao buscar CEP:", error);
                    alert("Erro ao buscar o CEP. Verifique sua conexão.");
                }
            }
        });
    }

    function limparCamposEndereco() {
        campoEndereco.value = "";
        campoCidadeEstado.value = "";
    }

    // Mantenha aqui as outras lógicas (Máscaras, Validar Sinais Vitais, etc) ---
    // Máscara simples para o CEP enquanto digita
    campoCep.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, "");
        v = v.replace(/^(\d{5})(\d)/, "$1-$2");
        e.target.value = v.slice(0, 9);
    });
});
// Adicione esta lógica dentro do seu DOMContentLoaded

const campoCPF = document.querySelector('input[placeholder="000.000.000-00"]');
const campoNome = document.querySelector('input[placeholder="Nome do paciente"]');
const campoDataNascimento = document.querySelector('input[type="date"]');

if (campoCPF) {
    campoCPF.addEventListener('blur', async () => {
        const cpfLimpo = campoCPF.value.replace(/\D/g, '');

        if (cpfLimpo.length === 11) {
            // 1. Feedback visual
            campoNome.value = "Consultando base de dados...";
            
            // 2. Simulação de busca no seu banco de dados (Exemplo)
            // Na vida real, aqui você faria um: fetch(`/api/pacientes/${cpfLimpo}`)
            setTimeout(() => {
                const pacienteEncontrado = buscarPacienteNoSistema(cpfLimpo);

                if (pacienteEncontrado) {
                    campoNome.value = pacienteEncontrado.nome;
                    campoDataNascimento.value = pacienteEncontrado.nascimento;
                    alert("Paciente já cadastrado! Dados carregados.");
                } else {
                    campoNome.value = ""; // Limpa para o novo cadastro
                    console.log("Paciente novo. Prossiga com o cadastro.");
                }
            }, 800); // Simula o tempo de resposta do servidor
        }
    });
}
// deixando aqui para quando for para parte 2 eu precisar usar esse código em javascript assim economiza meu tempo na hora de colocar tudo em ordem
//claramente isso é uma simulaçaõ de banco de dados, caso tenha que fazer busca automatizada eu tenho que consultar o site da receita link = https://servicos.receita.fazenda.gov.br/servicos/cpf/consultasituacao/consultapublica.asp
//terá uma api de banco de dados mais elaborado, possa ser via IONIC
// Simulação de um banco de dados interno
function buscarPacienteNoSistema(cpf) {
    const bancoExemplo = {
        "00000000000": { nome: "João das Neves", nascimento: "1992-05-15" },
        "11122233344": { nome: "Maria Silva", nascimento: "1985-10-20" }
    };
    return bancoExemplo[cpf] || null;
}