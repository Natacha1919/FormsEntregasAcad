document.addEventListener('DOMContentLoaded', () => {

    const API_URL = "https://myapi-1ytp.onrender.com/dados";
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbysvyAT94eDmcuxuYujdeMYjT6LLfasH53-NIdh5FTBDSDo1Z2EO1zJxQdCjqOZ2Ff7/exec";
    
    const hardSkillsList = ["Python","Java","JavaScript","C++","C#","SQL","R","MATLAB","Ruby","PHP","HTML","CSS","React","Angular","Vue.js","Django","Flask","Node.js","Spring","Kotlin","Swift","Objective-C","React Native","Flutter","DevOps (CI/CD)","Kubernetes","Docker","AWS","Microsoft Azure","Google Cloud Platform","Terraform","Ansible","Linux/Unix (administração)","Git/GitHub","Jenkins","Prometheus/Grafana","Selenium","Testes automatizados","Estrutura de Dados e Algoritmos","Arquitetura de Software e Padrões de Projeto","Análise de Dados","Business Intelligence","Power BI","Tableau","Apache Spark","Hadoop","ETL (data pipelines)","SQL avançado","NoSQL (MongoDB, Cassandra)","Pandas (Python)","NumPy","Scikit-Learn","TensorFlow","PyTorch","Deep Learning","Machine Learning","NLP (Processamento de Linguagem Natural)","Visão Computacional","Modelagem Estatística","Regressão e Classificação","Análise de Séries Temporais","Forecasting","Mineração de Dados (Data Mining)","Big Data","SAS","SPSS","Power Query","Google Analytics","Estatística Aplicada","Design Experimental","Visualização de Dados","Storytelling com Dados","Frameworks de IA (ML)","Modelagem de Redes Neurais","Reinforcement Learning","Otimização de Hiperparâmetros","Deploy de Modelos ML","ML Engineering","Pipeline ML","Ética em IA","LLMs (Large Language Models)","Transfer Learning","Anotação e Rotulagem de Dados","Interpretabilidade de Modelos","AI Ops","Robótica Inteligente","Segurança da Informação","Criptografia","Firewalls","IDS/IPS","CISSP (certificação)","CEH (certificação)","SOC (Security Operations Center)","Pentest (Penetration Testing)","Gestão de Riscos","LGPD","Hardening de Servidores","PKI / VPN","Resposta a Incidentes","Forense Digital","DevSecOps","Scrum","Kanban","PMBOK","PMP (certificação)","Jira","Trello","MS Project","Agile Scaling (SAFe)","Gestão de Recursos","Roadmapping","Lean","OKR","Gestão de Riscos (Projetos)","Gestão de Entregas (Deliverables)","Métricas Ágeis","SEO","SEM","Google Ads","Facebook Ads","HubSpot","RD Station","Automação de Marketing","Funil de Conversão","CRM (Salesforce, HubSpot)","E-mail Marketing","Copywriting","PPC","Teste A/B","Gestão de Mídias Sociais","Métricas de Performance","Growth Hacking","Marketing de Influência","UX Research","Prototipagem (Figma, Sketch)","UI Design","Adobe Photoshop","Adobe Illustrator","Adobe InDesign","Adobe Premiere","Final Cut Pro","DaVinci Resolve","After Effects","Audacity / Adobe Audition","UX Writing","Testes de Usabilidade","Design Thinking","Storytelling Visual","Ilustração Digital","Design Responsivo","Acessibilidade (WCAG)","Análise Financeira","Contabilidade","IFRS / Normas Contábeis","Planejamento Fiscal","Auditoria","BI Financeiro","Compliance","Gestão de Risco Financeiro","Direito Contratual","Direito Tributário","ERP (SAP, TOTVS)","Excel Avançado (Financeiro)","AutoCAD","SolidWorks","BIM","CAD/CAM","Simulações (ANSYS, COMSOL)","Automação Industrial (PLC)","Operação de Drones","Topografia Digital","Lean Manufacturing","Six Sigma","Operação de Maquinário Pesado","Certificações NR (NR-5, NR-10, NR-35)","Operação de Equipamentos Laboratoriais","Biossegurança","Fotografia Técnica","Impressão 3D","Usinagem CNC","Sistemas Operados por Robôs","Engenharia Elétrica","Inglês Fluente","Espanhol Fluente","Francês / Alemão / Mandarim","Redação Técnica","Documentação Técnica e Relatórios"];
    const coursesList = ["Administração","Arquitetura e Urbanismo","Ciência da Computação","Direito","Engenharia Civil","Engenharia de Produção","Gestão de Recursos Humanos","Marketing Digital","Pedagogia","Psicologia","Sistemas de Informação","Análise e Desenvolvimento de Sistemas","Design Gráfico","Educação Física","Enfermagem","Fisioterapia","Nutrição","Contabilidade","Jornalismo","Publicidade e Propaganda","Tecnologia em Jogos Digitais","Gestão Comercial","Logística","Recursos Humanos","Serviço Social","Outro"];
    
    let disciplinesList = [];
    let selectedCourses = new Set(); 

    const form = document.getElementById('hard-skills-form');
    const addSkillBtn = document.getElementById('add-skill-btn');
    const skillsContainer = document.getElementById('hard-skills-container');
    const submitBtn = document.getElementById('submit-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const feedbackMessage = document.getElementById('feedback-message');
    
    const cursoInput = document.getElementById('curso-input');
    const cursoTagsContainer = document.getElementById('curso-tags-container');
    const cursoResultsContainer = document.getElementById('curso-results');

    let skillCounter = 0;

    // Função de autocomplete genérica (sem alterações)
    function setupAutocomplete(inputElement, dataList, resultsContainer) {
        inputElement.addEventListener('input', () => {
            const value = inputElement.value.toLowerCase();
            resultsContainer.innerHTML = '';
            if (!value) return;
            const filteredItems = dataList.filter(item => item && item.toLowerCase().includes(value));
            filteredItems.slice(0, 10).forEach(itemText => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('autocomplete-item');
                const regex = new RegExp(`(${value})`, 'gi');
                itemDiv.innerHTML = itemText.replace(regex, '<strong>$1</strong>');
                itemDiv.addEventListener('click', () => {
                    inputElement.value = itemText;
                    resultsContainer.innerHTML = '';
                });
                resultsContainer.appendChild(itemDiv);
            });
        });
    }

    // Função para lidar com a seleção múltipla de cursos
    function setupCourseMultiselect() {
        function addCourseTag(courseName) {
            if (!courseName || selectedCourses.has(courseName)) {
                cursoInput.value = '';
                return;
            }

            selectedCourses.add(courseName);

            const tag = document.createElement('div');
            tag.classList.add('tag', 'course-tag'); /** MODIFICADO para usar classe genérica */
            tag.textContent = courseName;

            const removeBtn = document.createElement('span');
            removeBtn.classList.add('remove-tag-btn');
            removeBtn.innerHTML = '×';
            removeBtn.addEventListener('click', () => {
                selectedCourses.delete(courseName);
                tag.remove();
            });

            tag.appendChild(removeBtn);
            cursoTagsContainer.insertBefore(tag, cursoInput);
            cursoInput.value = '';
            cursoResultsContainer.innerHTML = '';
        }

        cursoInput.addEventListener('input', () => {
            const value = cursoInput.value.toLowerCase();
            cursoResultsContainer.innerHTML = '';
            if (!value) return;

            const filteredItems = coursesList.filter(item => item && item.toLowerCase().includes(value) && !selectedCourses.has(item));

            filteredItems.slice(0, 10).forEach(itemText => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('autocomplete-item');
                const regex = new RegExp(`(${value})`, 'gi');
                itemDiv.innerHTML = itemText.replace(regex, '<strong>$1</strong>');
                itemDiv.addEventListener('click', () => addCourseTag(itemText));
                cursoResultsContainer.appendChild(itemDiv);
            });
        });
        
        cursoInput.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                e.preventDefault();
                const firstSuggestion = cursoResultsContainer.querySelector('.autocomplete-item');
                if(firstSuggestion) {
                    addCourseTag(firstSuggestion.textContent);
                }
            }
        });
    }

    /** MODIFICADO: Adicionada uma nova função dedicada para disciplinas */
    function setupDisciplineMultiselect(inputElement, tagsContainer, resultsContainer, selectedDisciplinesSet) {
        function addDisciplineTag(disciplineName) {
            if (!disciplineName || selectedDisciplinesSet.has(disciplineName)) {
                inputElement.value = '';
                return; 
            }
            selectedDisciplinesSet.add(disciplineName);
            const tag = document.createElement('div');
            tag.classList.add('tag', 'discipline-tag'); 
            tag.textContent = disciplineName;
            const removeBtn = document.createElement('span');
            removeBtn.classList.add('remove-tag-btn');
            removeBtn.innerHTML = '×';
            removeBtn.addEventListener('click', () => {
                selectedDisciplinesSet.delete(disciplineName);
                tag.remove();
            });
            tag.appendChild(removeBtn);
            tagsContainer.insertBefore(tag, inputElement);
            inputElement.value = '';
            resultsContainer.innerHTML = '';
        }
        inputElement.addEventListener('input', () => {
            const value = inputElement.value.toLowerCase();
            resultsContainer.innerHTML = '';
            if (!value) return;
            const filteredItems = disciplinesList.filter(item => item && item.toLowerCase().includes(value) && !selectedDisciplinesSet.has(item));
            filteredItems.slice(0, 10).forEach(itemText => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('autocomplete-item');
                const regex = new RegExp(`(${value})`, 'gi');
                itemDiv.innerHTML = itemText.replace(regex, '<strong>$1</strong>');
                itemDiv.addEventListener('click', () => addDisciplineTag(itemText));
                resultsContainer.appendChild(itemDiv);
            });
        });
        inputElement.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                e.preventDefault();
                const firstSuggestion = resultsContainer.querySelector('.autocomplete-item');
                if(firstSuggestion) {
                    addDisciplineTag(firstSuggestion.textContent);
                } else if (inputElement.value) {
                    addDisciplineTag(inputElement.value);
                }
            }
        });
    }

    /** MODIFICADO: Função de criar card completamente atualizada */
    const addSkillCard = () => {
        skillCounter++;
        const card = document.createElement('div');
        card.classList.add('skill-card');

        // O HTML para o campo de disciplinas foi alterado para o formato de tags
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
            <div class="form-group autocomplete-container" style="margin-top: 1rem;">
                <label for="skill-disciplines-input-${skillCounter}">Disciplinas/Unidades Curriculares associadas:</label>
                <div class="tags-input-container discipline-tags-container">
                    <input type="text" id="skill-disciplines-input-${skillCounter}" class="autocomplete-input" placeholder="Busque e adicione disciplinas...">
                </div>
                <div class="autocomplete-results"></div>
            </div>
        `;

        skillsContainer.appendChild(card);
        card.querySelector('.remove-btn').addEventListener('click', () => card.remove());
        setupAutocomplete(card.querySelector('.skill-name'), hardSkillsList, card.querySelector('.skill-name + .autocomplete-results'));

        // Lógica para inicializar o campo de disciplinas multisselecionável
        card.selectedDisciplines = new Set();
        const disciplineInput = card.querySelector(`#skill-disciplines-input-${skillCounter}`);
        const disciplineTagsContainer = card.querySelector('.discipline-tags-container');
        const disciplineResultsContainer = card.querySelector('.discipline-tags-container + .autocomplete-results');
        setupDisciplineMultiselect(disciplineInput, disciplineTagsContainer, disciplineResultsContainer, card.selectedDisciplines);
    };
    
    /** MODIFICADO: Função de envio atualizada para coletar dados das tags de disciplina */
    const handleFormSubmit = (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        loadingSpinner.style.display = 'block';
        feedbackMessage.textContent = '';
        feedbackMessage.className = '';

        const formData = new FormData();
        formData.append('cursos', JSON.stringify(Array.from(selectedCourses)));
        formData.append('coordenador', document.getElementById('coordenador').value);
        formData.append('insights', document.getElementById('insights').value);
        
        const skillsDataArray = [];
        document.querySelectorAll('.skill-card').forEach(card => {
            const skillName = card.querySelector('.skill-name').value;
            if (skillName) {
                skillsDataArray.push({
                    name: skillName,
                    frequency: card.querySelector('.skill-frequency').value,
                    // Coleta os dados do Set de disciplinas anexado ao card
                    disciplines: Array.from(card.selectedDisciplines) 
                });
            }
        });

        formData.append('skillsData', JSON.stringify(skillsDataArray));

        fetch(SCRIPT_URL, { method: 'POST', body: formData })
            .then(response => { if (!response.ok) throw new Error('A resposta da rede não foi bem-sucedida.'); return response.text(); })
            .then(data => {
                 if (data.toLowerCase().includes("sucesso")) {
                    feedbackMessage.textContent = 'Dados enviados com sucesso!';
                    feedbackMessage.classList.add('success');
                    form.reset();
                    cursoTagsContainer.querySelectorAll('.tag').forEach(tag => tag.remove());
                    selectedCourses.clear();
                    skillsContainer.innerHTML = '';
                    addSkillCard(); 
                } else {
                    throw new Error(data);
                }
            })
            .catch(error => {
                feedbackMessage.textContent = `Erro ao enviar os dados: ${error.message}`;
                feedbackMessage.classList.add('error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                loadingSpinner.style.display = 'none';
            });
    };

    // Função de inicialização (sem alterações)
    async function initializeApp() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
            const dataFromApi = await response.json();
            disciplinesList = dataFromApi.map(item => item.Disciplina).filter(Boolean);
            console.log("Disciplinas carregadas com sucesso:", disciplinesList);
        } catch (error) {
            console.error("Falha ao carregar disciplinas da API:", error);
            alert("Atenção: Não foi possível carregar a lista de disciplinas da API. O autocomplete de disciplinas não funcionará.");
        } finally {
            addSkillCard();
        }
    }

    // ========================
    // INICIALIZAÇÃO DA PÁGINA
    // ========================
    setupCourseMultiselect();
    addSkillBtn.addEventListener('click', addSkillCard);
    form.addEventListener('submit', handleFormSubmit);
    initializeApp();
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.autocomplete-container')) {
            document.querySelectorAll('.autocomplete-results').forEach(res => res.innerHTML = '');
        }
    });
});