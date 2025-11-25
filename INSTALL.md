# Guia de Instalação e Configuração

## Pré-requisitos

### 1. Hugo Extended
```bash
# Fedora/RHEL
sudo dnf install hugo

# Ou baixar binário
wget https://github.com/gohugoio/hugo/releases/download/v0.147.8/hugo_extended_0.147.8_linux-amd64.tar.gz
tar -xzf hugo_extended_*.tar.gz
sudo mv hugo /usr/local/bin/
```

### 2. Node.js 18+ (para linting e hooks)
```bash
# Fedora/RHEL
sudo dnf install nodejs npm

# Ou usar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
```

## Instalação

### 1. Instalar Dependências Node
```bash
npm install
```

### 2. Instalar Husky (Pre-commit hooks)
```bash
npx husky install
```

### 3. Verificar Instalação
```bash
hugo version
node --version
npm --version
```

## Uso

### Desenvolvimento
```bash
make server
# ou
hugo server -D
```

### Linting
```bash
npm run lint
```

### Build
```bash
make build
# ou
hugo --minify
```

## Estrutura de Arquivos

```
blog/
├── .github/workflows/    # CI/CD
├── .husky/               # Git hooks
├── content/              # Conteúdo
├── themes/               # Tema customizado
│   └── tech-blog-theme/
│       ├── static/
│       │   ├── css/      # CSS modularizado
│       │   └── js/       # JS modularizado
│       └── layouts/      # Templates
├── .eslintrc.js          # ESLint config
├── .stylelintrc.json     # Stylelint config
├── package.json          # Node dependencies
└── hugo.toml            # Hugo config
```

## Notas Importantes

- JavaScript usa ES6 modules (requer navegador moderno)
- CSS está parcialmente modularizado (main.css ainda contém tudo)
- Pre-commit hooks rodam linting automaticamente
- CI/CD faz deploy automático no GitHub Pages

