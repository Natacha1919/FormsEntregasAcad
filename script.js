document.addEventListener('DOMContentLoaded', () => {

    // NOSSA BASE DE DADOS DE HARD SKILLS
    const hardSkillsList = [
        "Python", "Java", "JavaScript", "C++", "C#", "SQL", "R", "MATLAB", "Ruby", "PHP", "HTML", "CSS", "React", "Angular", "Vue.js", "Django", "Flask", "Node.js", "Spring", "Kotlin", "Swift", "Objective-C", "React Native", "Flutter", "DevOps (CI/CD)", "Kubernetes", "Docker", "AWS", "Microsoft Azure", "Google Cloud Platform", "Terraform", "Ansible", "Linux/Unix (administração)", "Git/GitHub", "Jenkins", "Prometheus/Grafana", "Selenium", "Testes automatizados", "Estrutura de Dados e Algoritmos", "Arquitetura de Software e Padrões de Projeto",
        "Análise de Dados", "Business Intelligence", "Power BI", "Tableau", "Apache Spark", "Hadoop", "ETL (data pipelines)", "SQL avançado", "NoSQL (MongoDB, Cassandra)", "Pandas (Python)", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch", "Deep Learning", "Machine Learning", "NLP (Processamento de Linguagem Natural)", "Visão Computacional", "Modelagem Estatística", "Regressão e Classificação", "Análise de Séries Temporais", "Forecasting", "Mineração de Dados (Data Mining)", "Big Data", "SAS", "SPSS", "Power Query", "Google Analytics", "Estatística Aplicada", "Design Experimental", "Visualização de Dados", "Storytelling com Dados",
        "Frameworks de IA (ML)", "Modelagem de Redes Neurais", "Reinforcement Learning", "Otimização de Hiperparâmetros", "Deploy de Modelos ML", "ML Engineering", "Pipeline ML", "Ética em IA", "LLMs (Large Language Models)", "Transfer Learning", "Anotação e Rotulagem de Dados", "Interpretabilidade de Modelos", "AI Ops", "Robótica Inteligente",
        "Segurança da Informação", "Criptografia", "Firewalls", "IDS/IPS", "CISSP (certificação)", "CEH (certificação)", "SOC (Security Operations Center)", "Pentest (Penetration Testing)", "Gestão de Riscos", "LGPD", "Hardening de Servidores", "PKI / VPN", "Resposta a Incidentes", "Forense Digital", "DevSecOps",
        "Scrum", "Kanban", "PMBOK", "PMP (certificação)", "Jira", "Trello", "MS Project", "Agile Scaling (SAFe)", "Gestão de Recursos", "Roadmapping", "Lean", "OKR", "Gestão de Riscos (Projetos)", "Gestão de Entregas (Deliverables)", "Métricas Ágeis",
        "SEO", "SEM", "Google Ads", "Facebook Ads", "HubSpot", "RD Station", "Automação de Marketing", "Funil de Conversão", "CRM (Salesforce, HubSpot)", "E-mail Marketing", "Copywriting", "PPC", "Teste A/B", "Gestão de Mídias Sociais", "Métricas de Performance", "Growth Hacking", "Marketing de Influência",
        "UX Research", "Prototipagem (Figma, Sketch)", "UI Design", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Adobe Premiere", "Final Cut Pro", "DaVinci Resolve", "After Effects", "Audacity / Adobe Audition", "UX Writing", "Testes de Usabilidade", "Design Thinking", "Storytelling Visual", "Ilustração Digital", "Design Responsivo", "Acessibilidade (WCAG)",
        "Análise Financeira", "Contabilidade", "IFRS / Normas Contábeis", "Planejamento Fiscal", "Auditoria", "BI Financeiro", "Compliance", "Gestão de Risco Financeiro", "Direito Contratual", "Direito Tributário", "ERP (SAP, TOTVS)", "Excel Avançado (Financeiro)",
        "AutoCAD", "SolidWorks", "BIM", "CAD/CAM", "Simulações (ANSYS, COMSOL)", "Automação Industrial (PLC)", "Operação de Drones", "Topografia Digital", "Lean Manufacturing", "Six Sigma", "Operação de Maquinário Pesado", "Certificações NR (NR-5, NR-10, NR-35)", "Operação de Equipamentos Laboratoriais", "Biossegurança", "Fotografia Técnica", "Impressão 3D", "Usinagem CNC", "Sistemas Operados por Robôs", "Engenharia Elétrica",
        "Inglês Fluente", "Espanhol Fluente", "Francês / Alemão / Mandarim", "Redação Técnica", "Documentação Técnica e Relatórios"
    ];

    // NOVA LISTA DE CURSOS PARA AUTOCOMPLETE
    const coursesList = [
        "Administração", "Arquitetura e Urbanismo", "Ciência da Computação", "Direito", "Engenharia Civil",
        "Engenharia de Produção", "Gestão de Recursos Humanos", "Marketing Digital", "Pedagogia", "Psicologia",
        "Sistemas de Informação", "Análise e Desenvolvimento de Sistemas", "Design Gráfico", "Educação Física",
        "Enfermagem", "Fisioterapia", "Nutrição", "Contabilidade", "Jornalismo", "Publicidade e Propaganda",
        "Tecnologia em Jogos Digitais", "Gestão Comercial", "Logística", "Recursos Humanos", "Serviço Social",
        "Outro" // Deixa a opção "Outro" para o usuário, se precisar
    ];

    const form = document.getElementById('hard-skills-form');
    const addSkillBtn = document.getElementById('add-skill-btn');
    const skillsContainer = document.getElementById('hard-skills-container');
    const submitBtn = document.getElementById('submit-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const feedbackMessage = document.getElementById('feedback-message');
    let skillCounter = 0;

    // A URL do seu App da Web implantado no Passo 1
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbysvyAT94eDmcuxuYujdeMYjT6LLfasH53-NIdh5FTBDSDo1Z2EO1zJxQdCjqOZ2Ff7/exec";

        // Função genérica para autocomplete
    function setupAutocomplete(inputElement, dataList) {
        const resultsContainer = inputElement.nextElementSibling; // O div.autocomplete-results é o próximo irmão

        inputElement.addEventListener('input', () => {
            const value = inputElement.value.toLowerCase();
            resultsContainer.innerHTML = ''; // Limpa resultados anteriores

            if (!value) {
                return;
            }

            const filteredItems = dataList.filter(item => item.toLowerCase().includes(value));

            filteredItems.slice(0, 10).forEach(itemText => { // Mostra no máximo 10 resultados
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('autocomplete-item');
                // Deixa em negrito a parte que o usuário digitou
                const regex = new RegExp(`(${value})`, 'gi');
                itemDiv.innerHTML = itemText.replace(regex, '<strong>$1</strong>');
                
                itemDiv.addEventListener('click', () => {
                    inputElement.value = itemText;
                    resultsContainer.innerHTML = ''; // Limpa os resultados ao selecionar
                });
                resultsContainer.appendChild(itemDiv);
            });
        });

        // Fecha a lista de resultados se clicar fora
        document.addEventListener('click', e => {
            // Garante que o clique não foi dentro do container de autocomplete do input atual
            if (!e.target.closest('.autocomplete-container') || !inputElement.closest('.autocomplete-container').contains(e.target)) {
                resultsContainer.innerHTML = '';
            }
        });
    }

    // Função que cria o card dinâmico (onde a skill é digitada)
    const addSkillCard = () => {
        skillCounter++;
        const card = document.createElement('div');
        card.classList.add('skill-card');
        card.innerHTML = `
            <button type="button" class="remove-btn" title="Remover Skill">×</button>
            <div class="skill-card-content">
                <div class="form-group autocomplete-container">
                    <label for="skill-name-${skillCounter}">Nome da Hard Skill:</label>
                    <input type="text" id="skill-name-${skillCounter}" class="skill-name autocomplete-input" required placeholder="Digite para buscar uma skill...">
                    <div class="autocomplete-results"></div>
                </div>
                <div class="form-group">
                    <label for="skill-freq-${skillCounter}">Frequência:</label>
                    <input type="number" id="skill-freq-${skillCounter}" class="skill-frequency" min="1" value="1" required>
                </div>
            </div>
            <div class="form-group" style="margin-top: 1rem;">
                <label for="skill-disciplines-${skillCounter}">Disciplinas/Unidades Curriculares associadas (separe por vírgula):</label>
                <input type="text" id="skill-disciplines-${skillCounter}" class="skill-disciplines" placeholder="Ex: Cálculo I, Gestão de Projetos">
            </div>
        `;
        card.querySelector('.remove-btn').addEventListener('click', () => card.remove());
        skillsContainer.appendChild(card);

        // Configura o autocomplete para o novo campo de skill
        setupAutocomplete(card.querySelector('.autocomplete-input'), hardSkillsList);
    };

    // LÓGICA DE SUBMISSÃO DO FORMULÁRIO
    addSkillBtn.addEventListener('click', addSkillCard);
    form.addEventListener('submit', e => {
        e.preventDefault();
        submitBtn.disabled = true;
        loadingSpinner.style.display = 'block';
        feedbackMessage.textContent = '';
        const formData = new FormData();
        formData.append('curso', document.getElementById('curso').value); // Valor do input do curso
        formData.append('coordenador', document.getElementById('coordenador').value);
        formData.append('professor', document.getElementById('professor').value);
        formData.append('insights', document.getElementById('insights').value);
        const skillsDataArray = [];
        document.querySelectorAll('.skill-card').forEach(card => {
            const skillName = card.querySelector('.skill-name').value;
            if (skillName) {
                skillsDataArray.push({
                    name: skillName,
                    frequency: card.querySelector('.skill-frequency').value,
                    disciplines: card.querySelector('.skill-disciplines').value.split(',').map(d => d.trim()).filter(d => d)
                });
            }
        });
        formData.append('skillsData', JSON.stringify(skillsDataArray));
        fetch(SCRIPT_URL, { method: 'POST', body: formData })
            .then(response => response.text())
            .then(data => {
                if (data.includes("sucesso")) {
                    feedbackMessage.textContent = 'Dados enviados com sucesso! A planilha foi atualizada.';
                    feedbackMessage.classList.add('success');
                    form.reset();
                    skillsContainer.innerHTML = '';
                    addSkillCard(); // Adiciona o primeiro card novamente para um novo preenchimento
                } else { throw new Error(data); }
            })
            .catch(error => {
                feedbackMessage.textContent = `Erro ao enviar os dados: ${error.message}`;
                feedbackMessage.classList.add('error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                loadingSpinner.style.display = 'none';
            });
    });

    // INICIA O AUTOCOMPLETE PARA O CAMPO DE CURSO
    const cursoInput = document.getElementById('curso');
    setupAutocomplete(cursoInput, coursesList);

    // Inicia o formulário com o primeiro card de Hard Skill
    addSkillCard();
});
