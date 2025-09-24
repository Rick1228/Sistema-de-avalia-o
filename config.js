// Arquivo de configuração do Sistema de Avaliação
// Substitua os valores abaixo pelos seus dados do Baserow

const CONFIG = {
    // URLs das suas tabelas do Baserow
    // Tabela de Atendimento (ID: 684447)
    ATTENDANCE_TABLE_URL: 'https://api.baserow.io/api/database/rows/table/684447/',
    
    // Tabela de Entrega (ID: 684453)
    DELIVERY_TABLE_URL: 'https://api.baserow.io/api/database/rows/table/684453/',
    
    // Token de API do Baserow
    API_TOKEN: 'WliGfvMy2o0WkI8LKP8Gk2dSWU4YeVmq',
    
    // Configurações opcionais
    APP_NAME: 'Sistema de Avaliação',
    COMPANY_NAME: 'Sua Empresa',
    
    // Configurações de cores (opcional)
    COLORS: {
        primary: '#667eea',
        secondary: '#764ba2',
        success: '#28a745',
        warning: '#ffc107',
        danger: '#dc3545',
        star: '#ffd700'
    }
};

// Função para aplicar a configuração
function applyConfig() {
    // Atualizar configurações do Baserow
    if (typeof BASEROW_CONFIG !== 'undefined') {
        BASEROW_CONFIG.ATTENDANCE_TABLE_URL = CONFIG.ATTENDANCE_TABLE_URL;
        BASEROW_CONFIG.DELIVERY_TABLE_URL = CONFIG.DELIVERY_TABLE_URL;
        BASEROW_CONFIG.API_TOKEN = CONFIG.API_TOKEN;
    }
    
    // Atualizar título da página
    if (CONFIG.APP_NAME !== 'Sistema de Avaliação') {
        document.title = CONFIG.APP_NAME;
        const headerTitle = document.querySelector('header h1');
        if (headerTitle) {
            headerTitle.textContent = CONFIG.APP_NAME;
        }
    }
    
    // Atualizar nome da empresa no rodapé (se existir)
    if (CONFIG.COMPANY_NAME !== 'Sua Empresa') {
        const companyElements = document.querySelectorAll('.company-name');
        companyElements.forEach(el => {
            el.textContent = CONFIG.COMPANY_NAME;
        });
    }
    
    console.log('✅ Configuração aplicada com sucesso!');
    console.log('📊 URL Atendimento:', CONFIG.ATTENDANCE_TABLE_URL);
    console.log('🚚 URL Entrega:', CONFIG.DELIVERY_TABLE_URL);
}

// Aplicar configuração quando a página carregar
document.addEventListener('DOMContentLoaded', applyConfig);

// Exportar configuração para uso global
window.CONFIG = CONFIG;
window.applyConfig = applyConfig;
