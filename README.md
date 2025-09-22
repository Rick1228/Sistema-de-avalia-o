# Sistema de Avaliação Caninos

Um sistema simples e intuitivo para avaliação de atendimento e entrega da Caninos, integrado com Baserow para armazenamento de dados.

## 🚀 Características

- **Página Inicial Intuitiva**: Duas opções claras para o cliente escolher
- **Logo Personalizada**: Identidade visual da Caninos
- **Interface Moderna**: Design responsivo e atrativo
- **Duas Avaliações Separadas**: Atendimento e Entrega
- **Sistema de Estrelas**: Avaliação visual de 1 a 5 estrelas
- **Dashboard**: Visualização de estatísticas e avaliações recentes
- **Integração Baserow**: Armazenamento seguro na nuvem
- **Fallback Local**: Funciona mesmo sem conexão com Baserow

## 📋 Critérios de Avaliação

### Sistema Simplificado
- **Nome**: Campo opcional para identificação
- **Satisfação**: Avaliação com emojis (😞 😕 😐 😊 😍)
- **Comentários**: Campo livre para feedback e sugestões

### Atendimento
- Avaliação geral da experiência de atendimento
- Comentários sobre o que pode ser melhorado

### Entrega
- Avaliação geral da experiência de entrega
- Comentários sobre o que pode ser melhorado

## 🛠️ Configuração do Baserow

### 1. Criar Tabelas no Baserow

#### Tabela de Atendimento
Crie uma tabela com os seguintes campos:
- `name` (Texto)
- `satisfaction_rating` (Número)
- `comments` (Texto Longo)
- `date` (Data/Hora)
- `type` (Texto)

#### Tabela de Entrega
Crie uma tabela com os seguintes campos:
- `name` (Texto)
- `satisfaction_rating` (Número)
- `comments` (Texto Longo)
- `date` (Data/Hora)
- `type` (Texto)

### 2. Obter Token de API
1. Acesse suas configurações no Baserow
2. Gere um token de API
3. Copie o token

### 3. Configurar o Sistema
Abra o console do navegador (F12) e execute:

```javascript
configureBaserow(
    'SEU_TABLE_ID_ATENDIMENTO',
    'SEU_TABLE_ID_ENTREGA',
    'SEU_API_TOKEN'
);
```

## 📁 Estrutura do Projeto

```
sistema-de-avaliacao/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Este arquivo
```

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `styles.css`:
- Gradiente principal: `#667eea` e `#764ba2`
- Cor das estrelas: `#ffd700`

### Textos
Todos os textos podem ser modificados diretamente no arquivo `index.html`.

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Smartphone

## 🔧 Funcionalidades

### Formulários
- Validação de campos obrigatórios
- Sistema de avaliação por estrelas
- Envio assíncrono de dados

### Dashboard
- Estatísticas em tempo real
- Médias calculadas automaticamente
- Lista de avaliações recentes

### Modais
- Confirmação de envio
- Tratamento de erros
- Interface amigável

## 🚨 Tratamento de Erros

O sistema inclui:
- Validação de formulários
- Tratamento de erros de API
- Fallback para armazenamento local
- Mensagens de erro amigáveis

## 📊 Dados Armazenados

### Localmente (LocalStorage)
- Backup das avaliações
- Funciona offline
- Sincronização automática quando possível

### Baserow
- Dados principais
- Acesso via API
- Backup na nuvem

## 🔒 Segurança

- Validação de dados no frontend
- Sanitização de inputs
- Tokens de API seguros
- HTTPS obrigatório para produção

## 🚀 Deploy

Para colocar em produção:
1. Configure o Baserow
2. Hospede os arquivos em um servidor web
3. Use HTTPS
4. Configure domínio personalizado (opcional)

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a configuração do Baserow
2. Confirme se os IDs das tabelas estão corretos
3. Verifique se o token de API é válido
4. Consulte o console do navegador para erros

## 🔄 Atualizações Futuras

Possíveis melhorias:
- Relatórios em PDF
- Exportação de dados
- Filtros no dashboard
- Notificações por email
- Integração com outros sistemas
