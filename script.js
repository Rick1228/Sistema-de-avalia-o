// Configurações do Baserow
const BASEROW_CONFIG = {
    // URLs das suas tabelas do Baserow
    ATTENDANCE_TABLE_URL: 'https://api.baserow.io/api/database/rows/table/684447/',
    DELIVERY_TABLE_URL: 'https://api.baserow.io/api/database/rows/table/684453/',
    API_TOKEN: 'WliGfvMy2o0WkI8LKP8Gk2dSWU4YeVmq'
};

// Estado global da aplicação
let currentRatings = {
    attendance: {
        satisfaction: 0
    },
    delivery: {
        satisfaction: 0
    }
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    initializeEmojis();
    initializeStars();
    initializeForms();
    initializeEventListeners();
});

// Sistema de navegação por abas
function showTab(tabName) {
    console.log('🔍 Debug - Navegando para aba:', tabName);
    
    // Esconder todas as abas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Mostrar aba selecionada
    const targetTab = document.getElementById(tabName + '-tab');
    if (targetTab) {
        targetTab.classList.add('active');
        console.log('✅ Aba ativada:', tabName + '-tab');
    } else {
        console.error('❌ Aba não encontrada:', tabName + '-tab');
    }
    
    // Atualizar título do header
    updateHeaderTitle(tabName);
    
    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Adicionar animação de entrada
    const activeTab = document.getElementById(tabName + '-tab');
    if (activeTab) {
        activeTab.style.animation = 'none';
        setTimeout(() => {
            activeTab.style.animation = 'fadeInUp 0.4s ease-out';
        }, 10);
    }
}

// Atualizar título do header
function updateHeaderTitle(tabName) {
    const headerTitle = document.getElementById('header-title');
    const titles = {
        'home': 'Sistema de Avaliação',
        'attendance': 'Avaliação de Atendimento',
        'delivery': 'Avaliação de Entrega'
    };
    
    if (headerTitle && titles[tabName]) {
        // Adicionar efeito de fade out
        headerTitle.style.opacity = '0.5';
        headerTitle.style.transform = 'translateY(-5px)';
        
        setTimeout(() => {
            headerTitle.textContent = titles[tabName];
            // Adicionar efeito de fade in
            headerTitle.style.opacity = '1';
            headerTitle.style.transform = 'translateY(0)';
        }, 150);
    }
}

// Inicializar sistema de emojis
function initializeEmojis() {
    document.querySelectorAll('.emoji-rating').forEach(emojiContainer => {
        const emojiOptions = emojiContainer.querySelectorAll('.emoji-option');
        const ratingType = emojiContainer.dataset.rating;
        
        emojiOptions.forEach((option) => {
            option.addEventListener('click', function() {
                const value = parseInt(this.dataset.value);
                setEmojiRating(ratingType, value, emojiContainer);
            });
        });
    });
}

// Definir avaliação por emoji
function setEmojiRating(type, value, container) {
    const [category, field] = type.split('-');
    currentRatings[category][field] = value;
    
    // Remover classe active de todas as opções
    container.querySelectorAll('.emoji-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Adicionar classe active à opção selecionada
    const selectedOption = container.querySelector(`[data-value="${value}"]`);
    if (selectedOption) {
        selectedOption.classList.add('active');
        
        // Adicionar efeito de confirmação
        selectedOption.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            selectedOption.style.animation = '';
        }, 600);
    }
    
    // Feedback visual com haptic feedback (se suportado)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    console.log('Avaliação selecionada:', value);
}

// Inicializar sistema de estrelas (mantido para compatibilidade)
function initializeStars() {
    document.querySelectorAll('.stars').forEach(starContainer => {
        const stars = starContainer.querySelectorAll('.star');
        const ratingType = starContainer.dataset.rating;
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const value = parseInt(this.dataset.value);
                setRating(ratingType, value, starContainer);
            });
            
            star.addEventListener('mouseenter', function() {
                const value = parseInt(this.dataset.value);
                highlightStars(stars, value);
            });
        });
        
        starContainer.addEventListener('mouseleave', function() {
            const currentValue = getCurrentRating(ratingType);
            highlightStars(stars, currentValue);
        });
    });
}

// Definir avaliação
function setRating(type, value, container) {
    const [category, field] = type.split('-');
    currentRatings[category][field] = value;
    
    const stars = container.querySelectorAll('.star');
    highlightStars(stars, value);
    
    // Atualizar texto da avaliação
    const ratingText = container.nextElementSibling;
    ratingText.textContent = getRatingText(value);
}

// Destacar estrelas
function highlightStars(stars, value) {
    stars.forEach((star, index) => {
        if (index < value) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Obter avaliação atual
function getCurrentRating(type) {
    const [category, field] = type.split('-');
    return currentRatings[category][field] || 0;
}

// Obter texto da avaliação
function getRatingText(value) {
    const texts = {
        1: 'Muito Ruim',
        2: 'Ruim',
        3: 'Regular',
        4: 'Bom',
        5: 'Excelente'
    };
    return texts[value] || 'Clique para avaliar';
}

// Inicializar formulários
function initializeForms() {
    // Formulário de atendimento
    document.getElementById('attendance-form').addEventListener('submit', function(e) {
        e.preventDefault();
        submitAttendanceForm();
    });
    
    // Formulário de entrega
    document.getElementById('delivery-form').addEventListener('submit', function(e) {
        e.preventDefault();
        submitDeliveryForm();
    });
}

// Enviar formulário de atendimento
async function submitAttendanceForm() {
    const form = document.getElementById('attendance-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Adicionar estado de loading
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    const formData = new FormData(form);
    
    // Validar avaliação
    if (currentRatings.attendance.satisfaction === 0) {
        showError('Por favor, selecione uma avaliação antes de enviar.');
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        return;
    }
    
    const data = {
        'Nome': formData.get('name') || 'Anônimo',
        'Avaliação de 1-5': currentRatings.attendance.satisfaction,
        'Comentários e sugestões': formData.get('comments'),
        'Data da avaliação': new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
        'attendance': 'attendance'
    };
    
    console.log('📝 Dados coletados do formulário de atendimento:');
    console.log('👤 Nome:', formData.get('name'));
    console.log('⭐ Avaliação:', currentRatings.attendance.satisfaction);
    console.log('💬 Comentários:', formData.get('comments'));
    console.log('📊 Dados finais para Baserow:', data);
    console.log('🔍 Verificação dos campos:');
    console.log('  - Campo Nome:', data['Nome']);
    console.log('  - Campo Avaliação:', data['Avaliação de 1-5']);
    console.log('  - Campo Comentários:', data['Comentários e sugestões']);
    console.log('  - Campo Data:', data['Data da avaliação']);
    console.log('  - Campo Tipo:', data['attendance']);
    
    try {
        await saveToBaserow(data, 'attendance');
        showSuccess('delivery'); // Navegar para tela de entrega após sucesso
        resetForm('attendance');
    } catch (error) {
        console.error('Erro ao salvar avaliação de atendimento:', error);
        // Salvar localmente como fallback
        saveLocalData(data, 'attendance');
        showSuccess('delivery'); // Navegar para tela de entrega mesmo com fallback
        resetForm('attendance');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Enviar formulário de entrega
async function submitDeliveryForm() {
    const form = document.getElementById('delivery-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Adicionar estado de loading
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    const formData = new FormData(form);
    
    // Validar avaliação
    if (currentRatings.delivery.satisfaction === 0) {
        showError('Por favor, selecione uma avaliação antes de enviar.');
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        return;
    }
    
    const data = {
        'Nome': formData.get('name') || 'Anônimo',
        'Avaliação de 1-5': currentRatings.delivery.satisfaction,
        'Comentários e sugestões': formData.get('comments'),
        'Data da avaliação': new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
        'delivery': 'delivery'
    };
    
    console.log('📝 Dados coletados do formulário de entrega:');
    console.log('👤 Nome:', formData.get('name'));
    console.log('⭐ Avaliação:', currentRatings.delivery.satisfaction);
    console.log('💬 Comentários:', formData.get('comments'));
    console.log('📊 Dados finais para Baserow:', data);
    console.log('🔍 Verificação dos campos:');
    console.log('  - Campo Nome:', data['Nome']);
    console.log('  - Campo Avaliação:', data['Avaliação de 1-5']);
    console.log('  - Campo Comentários:', data['Comentários e sugestões']);
    console.log('  - Campo Data:', data['Data da avaliação']);
    console.log('  - Campo Tipo:', data['delivery']);
    
    try {
        await saveToBaserow(data, 'delivery');
        showSuccess('home'); // Navegar para tela inicial após sucesso
        resetForm('delivery');
    } catch (error) {
        console.error('Erro ao salvar avaliação de entrega:', error);
        // Salvar localmente como fallback
        saveLocalData(data, 'delivery');
        showSuccess('home'); // Navegar para tela inicial mesmo com fallback
        resetForm('delivery');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Validar avaliações
function validateRatings(type) {
    const ratings = currentRatings[type];
    return Object.values(ratings).every(rating => rating > 0);
}

// Obter IDs dos campos do Baserow
async function getFieldIds(tableId) {
    try {
        const response = await fetch(`https://api.baserow.io/api/database/fields/table/${tableId}/`, {
            headers: {
                'Authorization': `Token ${BASEROW_CONFIG.API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const fields = await response.json();
        console.log('🔍 Campos encontrados na tabela:', fields);
        
        // Criar mapeamento de nomes para IDs
        const fieldMap = {};
        fields.forEach(field => {
            fieldMap[field.name] = field.id;
            console.log(`📋 Campo: "${field.name}" | ID: ${field.id} | Tipo: ${field.type}`);
        });
        
        return fieldMap;
    } catch (error) {
        console.error('❌ Erro ao buscar campos:', error);
        return null;
    }
}

// Salvar no Baserow
async function saveToBaserow(data, type) {
    const url = type === 'attendance' ? BASEROW_CONFIG.ATTENDANCE_TABLE_URL : BASEROW_CONFIG.DELIVERY_TABLE_URL;
    const tableId = type === 'attendance' ? '684447' : '684453';
    
    console.log('🔍 Debug - Tentando salvar no Baserow:');
    console.log('📊 Tipo:', type);
    console.log('🌐 URL:', url);
    console.log('🔑 Token:', BASEROW_CONFIG.API_TOKEN.substring(0, 10) + '...');
    console.log('📝 Dados originais:', data);
    
    // Obter IDs dos campos
    const fieldMap = await getFieldIds(tableId);
    
    if (!fieldMap) {
        throw new Error('Não foi possível obter os IDs dos campos');
    }
    
    // Converter dados para usar IDs dos campos com prefixo field_
    const dataWithFieldIds = {};
    for (const [fieldName, value] of Object.entries(data)) {
        const fieldId = fieldMap[fieldName];
        if (fieldId) {
            dataWithFieldIds[`field_${fieldId}`] = value;
            console.log(`✅ Mapeado: "${fieldName}" -> field_${fieldId} = "${value}"`);
        } else {
            console.warn(`⚠️ Campo não encontrado: "${fieldName}"`);
        }
    }
    
    console.log('📝 Dados com IDs dos campos:', dataWithFieldIds);
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${BASEROW_CONFIG.API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataWithFieldIds)
    });
    
    console.log('📡 Resposta do Baserow:');
    console.log('✅ Status:', response.status);
    console.log('📋 Headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro detalhado:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('✅ Sucesso! Dados salvos:', result);
    
    // Verificar se os dados realmente foram salvos
    setTimeout(async () => {
        try {
            const verifyResponse = await fetch(`https://api.baserow.io/api/database/rows/table/${tableId}/`, {
                headers: {
                    'Authorization': `Token ${BASEROW_CONFIG.API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (verifyResponse.ok) {
                const rows = await verifyResponse.json();
                console.log('🔍 Verificação - Dados na tabela:', rows);
            }
        } catch (error) {
            console.error('❌ Erro na verificação:', error);
        }
    }, 1000);
    
    return result;
}

// Salvar dados localmente (fallback)
function saveLocalData(data, type) {
    const localData = JSON.parse(localStorage.getItem('evaluationData') || '{"attendance": [], "delivery": []}');
    localData[type].push(data);
    localStorage.setItem('evaluationData', JSON.stringify(localData));
}


// Resetar formulário
function resetForm(type) {
    const form = document.getElementById(type + '-form');
    form.reset();
    
    // Resetar avaliações
    currentRatings[type] = Object.keys(currentRatings[type]).reduce((acc, key) => {
        acc[key] = 0;
        return acc;
    }, {});
    
    // Resetar emojis visuais
    document.querySelectorAll(`[data-rating^="${type}-"]`).forEach(container => {
        container.querySelectorAll('.emoji-option').forEach(option => {
            option.classList.remove('active');
        });
    });
    
    // Resetar estrelas visuais (compatibilidade)
    document.querySelectorAll(`[data-rating^="${type}-"]`).forEach(container => {
        const stars = container.querySelectorAll('.star');
        stars.forEach(star => star.classList.remove('active'));
        const textElement = container.nextElementSibling;
        if (textElement && textElement.classList.contains('rating-text')) {
            textElement.textContent = 'Clique para avaliar';
        }
    });
}

// Mostrar modal de sucesso
function showSuccess(nextTab = null) {
    const modal = document.getElementById('success-modal');
    const modalTitle = modal.querySelector('h3');
    const modalMessage = modal.querySelector('p');
    
    // Personalizar mensagem baseada na próxima tela
    if (nextTab === 'delivery') {
        modalTitle.textContent = 'Avaliação de Atendimento Enviada!';
        modalMessage.textContent = 'Obrigado! Agora vamos para a avaliação de entrega.';
    } else if (nextTab === 'home') {
        modalTitle.textContent = 'Avaliação de Entrega Enviada!';
        modalMessage.textContent = 'Obrigado por completar ambas as avaliações! Voltando ao início.';
    } else {
        modalTitle.textContent = 'Avaliação Enviada!';
        modalMessage.textContent = 'Obrigado pela sua avaliação! Ela foi salva com sucesso.';
    }
    
    modal.style.display = 'block';
    
    // Adicionar animação de confete (opcional)
    createConfetti();
    
    // Auto-fechar após 2 segundos e mostrar aviso de próxima avaliação
    setTimeout(() => {
        closeModal();
        
        // Se foi especificada uma próxima tela, mostrar aviso
        if (nextTab) {
            showNextEvaluationWarning(nextTab);
        }
    }, 2000);
}

// Mostrar aviso de próxima avaliação
function showNextEvaluationWarning(nextTab) {
    console.log('🔍 Debug - Mostrando aviso de próxima avaliação:', nextTab);
    
    const warning = document.getElementById('next-evaluation-warning');
    const warningText = document.getElementById('next-evaluation-text');
    const countdownNumber = document.getElementById('countdown-number');
    const skipButton = document.getElementById('skip-warning');
    
    // Personalizar texto baseado na próxima tela
    if (nextTab === 'delivery') {
        warningText.textContent = 'Agora vamos avaliar a qualidade da entrega do seu pedido.';
    } else if (nextTab === 'home') {
        warningText.textContent = 'Obrigado por completar todas as avaliações!';
    }
    
    console.log('📝 Texto do aviso:', warningText.textContent);
    
    // Mostrar o aviso
    warning.style.display = 'flex';
    console.log('✅ Aviso exibido');
    
    // Iniciar countdown
    let countdown = 3;
    countdownNumber.textContent = countdown;
    
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownNumber.textContent = countdown;
        console.log('⏰ Countdown:', countdown);
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            console.log('🚀 Navegando para:', nextTab);
            hideNextEvaluationWarning();
            showTab(nextTab);
        }
    }, 1000);
    
    // Botão para pular o aviso
    skipButton.onclick = () => {
        console.log('⏭️ Pulando aviso, navegando para:', nextTab);
        clearInterval(countdownInterval);
        hideNextEvaluationWarning();
        showTab(nextTab);
    };
}

// Esconder aviso de próxima avaliação
function hideNextEvaluationWarning() {
    const warning = document.getElementById('next-evaluation-warning');
    warning.style.display = 'none';
}

// Mostrar modal de erro
function showError(message) {
    const modal = document.getElementById('error-modal');
    document.getElementById('error-message').textContent = message;
    modal.style.display = 'block';
}

// Fechar modal
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Criar efeito de confete (simples)
function createConfetti() {
    const colors = ['#0ea5e9', '#f97316', '#10b981', '#f59e0b', '#ef4444'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = 'confettiFall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 20);
    }
}

// Adicionar CSS para animação de confete
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


// Função para configurar Baserow (chamada pelo usuário)
function configureBaserow(attendanceTableId, deliveryTableId, apiToken) {
    BASEROW_CONFIG.ATTENDANCE_TABLE_URL = `https://api.baserow.io/api/database/rows/table/${attendanceTableId}/`;
    BASEROW_CONFIG.DELIVERY_TABLE_URL = `https://api.baserow.io/api/database/rows/table/${deliveryTableId}/`;
    BASEROW_CONFIG.API_TOKEN = apiToken;
    
    console.log('Configuração do Baserow atualizada!');
    console.log('URL Atendimento:', BASEROW_CONFIG.ATTENDANCE_TABLE_URL);
    console.log('URL Entrega:', BASEROW_CONFIG.DELIVERY_TABLE_URL);
}

// Inicializar event listeners
function initializeEventListeners() {
    // Event listeners para os cards de avaliação
    document.querySelectorAll('.evaluation-card[data-tab]').forEach(card => {
        card.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            showTab(tabName);
        });
    });
    
    // Event listeners para botões de voltar
    document.querySelectorAll('button[data-action="back"]').forEach(button => {
        button.addEventListener('click', function() {
            showTab('home');
        });
    });
    
    // Event listeners para fechar modais
    document.querySelectorAll('button[data-action="close-modal"]').forEach(button => {
        button.addEventListener('click', function() {
            closeModal();
        });
    });
    
    // Event listener para fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    });
}

// Exportar funções para uso global (compatibilidade)
window.configureBaserow = configureBaserow;
window.showTab = showTab;
window.closeModal = closeModal;
