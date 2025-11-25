# Blog Técnico

Blog construído com [Hugo](https://gohugo.io/) usando tema customizado com arquitetura moderna e otimizada.

## 🚀 Características

- ✅ **Acessibilidade**: Design focado em acessibilidade e legibilidade
- ✅ **Responsivo**: Funciona perfeitamente em dispositivos móveis
- ✅ **Dark/Light Theme**: Toggle entre temas claro e escuro
- ✅ **Performance**: Carregamento rápido e otimizado
- ✅ **SEO**: Estrutura otimizada para mecanismos de busca
- ✅ **PWA**: Progressive Web App com service worker
- ✅ **Modular**: CSS e JavaScript organizados em módulos
- ✅ **Build System**: Bundling e minificação automáticos
- ✅ **Testes**: Testes unitários com Vitest
- ✅ **TypeScript**: Suporte opcional para TypeScript
- ✅ **CI/CD**: Deploy automático no GitHub Pages

## 📋 Pré-requisitos

### Hugo Extended

```bash
# Fedora/RHEL
sudo dnf install hugo

# Ou baixar binário
wget https://github.com/gohugoio/hugo/releases/download/v0.147.8/hugo_extended_0.147.8_linux-amd64.tar.gz
tar -xzf hugo_extended_*.tar.gz
sudo mv hugo /usr/local/bin/
```

### Node.js 18+ (para build, linting e testes)

```bash
# Fedora/RHEL
sudo dnf install nodejs npm

# Ou usar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
```

## 🛠️ Instalação

### 1. Instalar Dependências

```bash
make deps
# ou
npm install && npx husky install
```

### 2. Verificar Instalação

```bash
hugo version
node --version
npm --version
```

## 💻 Uso

### Desenvolvimento

```bash
# Iniciar servidor
make server
# ou
hugo server -D

# Acesse http://localhost:1313
```

### Build para Produção

```bash
# Build completo (assets + Hugo)
make build

# Ou separadamente
make build-assets  # Build JS e CSS
hugo --minify      # Build Hugo
```

### Linting e Formatação

```bash
npm run lint       # Verificar código
npm run format     # Formatar código
```

### Testes

```bash
npm run test       # Executar testes
npm run test:watch # Watch mode
```

### Criar Novo Post

```bash
make new POST=nome-do-post
# ou
hugo new posts/meu-post.md
```

## 📁 Estrutura

```
blog/
├── .github/workflows/    # CI/CD
├── .husky/               # Git hooks
├── content/              # Conteúdo
│   ├── posts/           # Posts do blog
│   └── about.md         # Páginas
├── themes/              # Tema customizado
│   └── tech-blog-theme/
│       ├── static/
│       │   ├── css/     # CSS modularizado
│       │   │   ├── variables.css
│       │   │   ├── reset.css
│       │   │   ├── layout.css
│       │   │   ├── components.css
│       │   │   ├── home.css
│       │   │   ├── content.css
│       │   │   ├── code.css
│       │   │   └── responsive.css
│       │   └── js/     # JavaScript modularizado
│       │       ├── main.js
│       │       ├── navigation.js
│       │       ├── theme.js
│       │       ├── smooth-scroll.js
│       │       ├── code-copy.js
│       │       ├── lazy-load.js
│       │       ├── pwa.js
│       │       └── sw.js (service worker)
│       └── layouts/    # Templates Hugo
├── scripts/            # Scripts úteis
├── .eslintrc.js        # ESLint config
├── .stylelintrc.json   # Stylelint config
├── tsconfig.json       # TypeScript config
├── vitest.config.js    # Vitest config
├── postcss.config.js   # PostCSS config
├── build.js            # Build script
├── package.json        # Node dependencies
├── hugo.toml          # Configuração Hugo
└── Makefile           # Comandos úteis
```

## 🎨 CSS Modularizado

O CSS foi dividido em módulos para melhor organização:

- `variables.css` - Design system e variáveis
- `reset.css` - Reset e estilos base
- `layout.css` - Header, footer, container
- `components.css` - Componentes reutilizáveis
- `home.css` - Página inicial
- `content.css` - Posts e páginas
- `code.css` - Syntax highlighting
- `responsive.css` - Media queries

## 📦 JavaScript Modularizado

JavaScript organizado em módulos ES6:

- `main.js` - Entry point
- `navigation.js` - Navegação mobile
- `theme.js` - Gerenciamento de tema
- `smooth-scroll.js` - Scroll suave
- `code-copy.js` - Copiar código
- `lazy-load.js` - Lazy loading
- `pwa.js` - Funcionalidades PWA

## 🔧 Build System

### JavaScript

- **Desenvolvimento**: Módulos ES6 separados
- **Produção**: Bundle minificado com esbuild

### CSS

- **Desenvolvimento**: Módulos separados
- **Produção**: Minificado com PostCSS

### Comandos

```bash
npm run build:js    # Build JavaScript
npm run build:css   # Build CSS
npm run build       # Build completo
```

## 🧪 Testes

Testes unitários configurados com Vitest:

```bash
npm run test        # Executar testes
npm run test:watch  # Watch mode
```

Cobertura de código disponível em `coverage/`.

## 📱 PWA

O blog é uma Progressive Web App:

- Service Worker para cache
- Web App Manifest
- Installable
- Offline support

## 🔒 Segurança

- Content Security Policy (CSP)
- HTML sanitização nos shortcodes
- Validação de inputs
- `unsafe = false` no Hugo

## 🚀 Deploy

### GitHub Pages (Automático)

O deploy acontece automaticamente via GitHub Actions quando você faz push para `master` ou `main`.

### Deploy Manual

```bash
make build
# Os arquivos estarão em public/
```

## 📝 Comandos Make

```bash
make help      # Ver todos os comandos
make deps      # Instalar dependências
make server    # Iniciar servidor
make build     # Build completo
make clean     # Limpar arquivos gerados
make lint      # Executar linting
make test      # Executar testes
make new POST=nome  # Criar novo post
```

## 🔄 CI/CD

O workflow GitHub Actions:

1. Checkout do código
2. Setup Hugo Extended
3. Setup Node.js
4. Instalar dependências
5. Build assets (JS/CSS)
6. Build Hugo
7. Deploy no GitHub Pages

## 📚 Documentação Adicional

- `IMPROVEMENTS.md` - Lista completa de melhorias
- `INSTALL.md` - Guia de instalação detalhado

## 🐛 Troubleshooting

### JavaScript não funciona

- Verifique se está usando navegador moderno (suporte ES6 modules)
- Em produção, verifique se `main.bundle.js` foi gerado

### CSS não carrega

- Verifique se todos os módulos CSS existem
- Limpe cache do navegador

### Build falha

- Execute `npm install` para instalar dependências
- Verifique versões: `node --version` (>=18), `hugo version`

## 📄 Licença

MIT
