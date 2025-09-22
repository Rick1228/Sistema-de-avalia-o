# 🚀 Deploy no Vercel - Sistema de Avaliação Caninos

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Projeto no GitHub (já configurado)
- Node.js 18+ (opcional, para desenvolvimento local)

## 🎯 Deploy Automático

### 1. **Conectar ao Vercel**
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Importe o repositório: `Rick1228/Sistema-de-avalia-o`

### 2. **Configurações do Projeto**
- **Framework Preset**: Vite
- **Root Directory**: `./` (raiz do projeto)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. **Variáveis de Ambiente (Opcional)**
Se quiser configurar o Baserow via variáveis de ambiente:
- `VITE_BASEROW_ATTENDANCE_URL`
- `VITE_BASEROW_DELIVERY_URL`
- `VITE_BASEROW_API_TOKEN`

### 4. **Deploy**
- Clique em "Deploy"
- Aguarde o build (2-3 minutos)
- Seu projeto estará disponível em: `https://sistema-avaliacao-caninos.vercel.app`

## 🛠️ Deploy Manual

### 1. **Instalar Dependências**
```bash
npm install
```

### 2. **Build do Projeto**
```bash
npm run build
```

### 3. **Preview Local**
```bash
npm run preview
```

### 4. **Deploy via Vercel CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## 📁 Estrutura do Projeto

```
sistema-avaliacao-caninos/
├── public/
│   ├── _redirects          # Redirecionamentos
│   ├── robots.txt          # SEO
│   ├── sitemap.xml         # Sitemap
│   └── manifest.json       # PWA
├── src/ (ou raiz)
│   ├── index.html          # Página principal
│   ├── styles.css          # Estilos
│   ├── script.js           # JavaScript
│   └── config.js           # Configurações
├── package.json            # Dependências
├── vercel.json             # Configuração Vercel
├── vite.config.js          # Configuração Vite
└── .gitignore              # Arquivos ignorados
```

## ⚙️ Configurações Avançadas

### 1. **Domínio Personalizado**
1. No dashboard do Vercel
2. Vá em "Settings" > "Domains"
3. Adicione seu domínio
4. Configure DNS conforme instruções

### 2. **Analytics**
1. Ative Vercel Analytics
2. Configure Google Analytics (opcional)
3. Monitore performance e erros

### 3. **Performance**
- ✅ **Lazy Loading**: Implementado
- ✅ **Minificação**: Ativada
- ✅ **Compressão**: Automática
- ✅ **CDN**: Global (Vercel Edge)

## 🔧 Troubleshooting

### Problema: Build falha
**Solução**: Verifique se todas as dependências estão no `package.json`

### Problema: Página não carrega
**Solução**: Verifique o arquivo `_redirects` na pasta `public`

### Problema: CSS não aplica
**Solução**: Verifique os caminhos dos arquivos CSS no HTML

### Problema: JavaScript não funciona
**Solução**: Verifique o console do navegador para erros

## 📊 Monitoramento

### 1. **Vercel Dashboard**
- Acesse o dashboard do Vercel
- Monitore deployments, performance e erros
- Configure alertas

### 2. **Google Analytics** (Opcional)
```html
<!-- Adicione no <head> do index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎉 Resultado Final

Após o deploy, seu sistema estará disponível em:
- **URL**: `https://sistema-avaliacao-caninos.vercel.app`
- **Performance**: A+ (Lighthouse)
- **SEO**: Otimizado
- **PWA**: Funcional
- **Mobile**: Responsivo

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs no Vercel Dashboard
2. Consulte a documentação do Vercel
3. Verifique o console do navegador
4. Teste localmente com `npm run dev`

---

**🚀 Seu sistema está pronto para produção!**
