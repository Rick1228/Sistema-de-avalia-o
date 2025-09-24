# 🔧 Guia Completo - Configuração do Baserow

## 📋 O que você precisa para conectar o Baserow

### 1. **Conta no Baserow** 
- Acesse [baserow.io](https://baserow.io)
- Crie uma conta gratuita ou faça login

### 2. **Criar um Workspace**
- Após fazer login, crie um novo workspace
- Dê um nome como "Sistema de Avaliação"

### 3. **Criar o Banco de Dados**
- No workspace, clique em "Create new database"
- Nome: "Avaliações Caninos"

### 4. **Criar as Tabelas**

#### 📞 **Tabela 1: Avaliações de Atendimento**
Crie uma tabela com os seguintes campos:

| Nome do Campo | Tipo | Configurações |
|---------------|------|---------------|
| `name` | Text | Nome do cliente (opcional) |
| `satisfaction_rating` | Number | Avaliação de 1-5 |
| `comments` | Long text | Comentários e sugestões |
| `date` | Date | Data da avaliação |
| `type` | Text | Sempre "attendance" |

#### 🚚 **Tabela 2: Avaliações de Entrega**
Crie uma segunda tabela com os mesmos campos:

| Nome do Campo | Tipo | Configurações |
|---------------|------|---------------|
| `name` | Text | Nome do cliente (opcional) |
| `satisfaction_rating` | Number | Avaliação de 1-5 |
| `comments` | Long text | Comentários e sugestões |
| `date` | Date | Data da avaliação |
| `type` | Text | Sempre "delivery" |

### 5. **Obter o Token de API**

#### Passo a passo:
1. No Baserow, vá em **Settings** (Configurações)
2. Clique em **API Tokens**
3. Clique em **Create new token**
4. Dê um nome: "Sistema Avaliação"
5. **Copie o token** (você só verá uma vez!)

### 6. **Obter os IDs das Tabelas**

#### Para cada tabela:
1. Abra a tabela
2. Na URL, você verá algo como: `https://app.baserow.io/database/123456/table/789012`
3. O **ID da tabela** é o último número: `789012`

### 7. **Configurar o Projeto**

#### Edite o arquivo `config.js`:

```javascript
const CONFIG = {
    // Substitua pelos seus IDs reais
    ATTENDANCE_TABLE_URL: 'https://api.baserow.io/api/database/rows/table/SEU_ID_TABELA_ATENDIMENTO/',
    DELIVERY_TABLE_URL: 'https://api.baserow.io/api/database/rows/table/SEU_ID_TABELA_ENTREGA/',
    
    // Substitua pelo seu token real
    API_TOKEN: 'SEU_TOKEN_AQUI',
    
    // Personalize se quiser
    APP_NAME: 'Sistema de Avaliação Caninos',
    COMPANY_NAME: 'Caninos - Agropecuária & Petshop'
};
```

## 🔍 **Como encontrar os IDs das tabelas**

### Método 1: Pela URL
1. Abra sua tabela no Baserow
2. A URL será: `https://app.baserow.io/database/123456/table/789012`
3. O ID da tabela é: `789012`

### Método 2: Pela API
1. Vá em Settings > API Tokens
2. Use o token para fazer uma requisição:
```bash
curl -H "Authorization: Token SEU_TOKEN" \
     https://api.baserow.io/api/database/tables/
```

## 📝 **Exemplo de Configuração Completa**

```javascript
const CONFIG = {
    ATTENDANCE_TABLE_URL: 'https://api.baserow.io/api/database/rows/table/123456/',
    DELIVERY_TABLE_URL: 'https://api.baserow.io/api/database/rows/table/789012/',
    API_TOKEN: 'token_abc123def456ghi789',
    APP_NAME: 'Sistema de Avaliação Caninos',
    COMPANY_NAME: 'Caninos - Agropecuária & Petshop'
};
```

## 🧪 **Testando a Conexão**

### 1. **Teste Manual**
Abra o console do navegador (F12) e digite:
```javascript
// Testar conexão
fetch('https://api.baserow.io/api/database/rows/table/SEU_ID/', {
    headers: {
        'Authorization': 'Token SEU_TOKEN'
    }
})
.then(response => response.json())
.then(data => console.log('✅ Conexão OK:', data))
.catch(error => console.error('❌ Erro:', error));
```

### 2. **Teste pelo Sistema**
1. Configure o `config.js`
2. Faça uma avaliação de teste
3. Verifique se aparece na tabela do Baserow

## 🔒 **Segurança e Boas Práticas**

### ✅ **Faça:**
- Mantenha seu token seguro
- Use HTTPS sempre
- Não compartilhe o token publicamente
- Faça backup das configurações

### ❌ **Não faça:**
- Não coloque o token no código público
- Não compartilhe URLs com IDs
- Não use tokens de produção em desenvolvimento

## 🚀 **Deploy com Baserow**

### 1. **Configurar Variáveis de Ambiente (Recomendado)**
No Vercel, adicione as variáveis:
- `BASEROW_ATTENDANCE_TABLE_ID`
- `BASEROW_DELIVERY_TABLE_ID` 
- `BASEROW_API_TOKEN`

### 2. **Atualizar o código para usar variáveis:**
```javascript
const CONFIG = {
    ATTENDANCE_TABLE_URL: `https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_ATTENDANCE_TABLE_ID}/`,
    DELIVERY_TABLE_URL: `https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_DELIVERY_TABLE_ID}/`,
    API_TOKEN: process.env.BASEROW_API_TOKEN
};
```

## 📊 **Estrutura dos Dados**

### Exemplo de dados que serão salvos:

```json
{
    "name": "João Silva",
    "satisfaction_rating": 5,
    "comments": "Atendimento excelente! Muito atenciosos.",
    "date": "2024-01-15T10:30:00Z",
    "type": "attendance"
}
```

## 🆘 **Solução de Problemas**

### ❌ **Erro 401 (Unauthorized)**
- Verifique se o token está correto
- Confirme se o token tem permissões

### ❌ **Erro 404 (Not Found)**
- Verifique se os IDs das tabelas estão corretos
- Confirme se as tabelas existem

### ❌ **Erro 400 (Bad Request)**
- Verifique se os nomes dos campos estão corretos
- Confirme se os tipos de dados estão corretos

## 📞 **Suporte**

Se precisar de ajuda:
1. Verifique a [documentação do Baserow](https://baserow.io/docs)
2. Teste a conexão manualmente
3. Verifique os logs do console do navegador

---

**🎉 Após configurar tudo, seu sistema estará salvando as avaliações diretamente no Baserow!**
