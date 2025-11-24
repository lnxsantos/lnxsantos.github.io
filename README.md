# Blog Técnico

Blog construído com [Hugo](https://gohugo.io/) usando tema customizado.

## Características

- ✅ **Acessibilidade**: Design focado em acessibilidade e legibilidade
- ✅ **Responsivo**: Funciona perfeitamente em dispositivos móveis
- ✅ **Dark/Light Theme**: Toggle entre temas claro e escuro
- ✅ **Performance**: Carregamento rápido e otimizado
- ✅ **SEO**: Estrutura otimizada para mecanismos de busca
- ✅ **Compartilhamento Social**: Open Graph e Twitter Cards configurados

## Instalação

### Pré-requisitos

**Fedora/RHEL:**

```bash
sudo dnf install hugo
```

**Outras distribuições:**

```bash
# Baixar Hugo
wget https://github.com/gohugoio/hugo/releases/download/v0.121.0/hugo_extended_0.121.0_linux-amd64.tar.gz
tar -xzf hugo_extended_*.tar.gz
sudo mv hugo /usr/local/bin/
```

**Verificar:**

```bash
hugo version
```

## Uso

### Desenvolvimento

```bash
# Iniciar servidor
hugo server -D

# Ou usar Makefile
make server
```

Acesse `http://localhost:1313`

### Criar Novo Post

```bash
hugo new posts/meu-post.md
```

Edite o arquivo e configure:

```yaml
---
title: "Título do Post"
date: 2024-01-01
draft: false
categories: ["categoria1"]
tags: ["tag1", "tag2"]
description: "Descrição do post"
image: "/images/posts/imagem.png"  # Opcional: 1200x630px
---
```

### Build para Produção

```bash
hugo --minify
```

Os arquivos serão gerados em `public/`

## Estrutura

```
blog/
├── content/posts/       # Posts do blog
├── themes/             # Tema customizado
├── static/images/       # Imagens (OG, posts)
├── scripts/            # Scripts úteis
├── hugo.toml          # Configuração
└── README.md
```

## Configuração

### Personalizar Site

Edite `hugo.toml`:

```toml
baseURL = 'https://seusite.com/'
title = 'Seu Blog'
[params]
  author = "Seu Nome"
  description = "Descrição do blog"
  twitter_site = "@seu-usuario"
  og_image = "/images/og-default.png"
```

### Dark/Light Theme

O tema alterna automaticamente baseado na preferência do sistema. Use o botão no header para alternar manualmente.

### Compartilhamento Social

1. Crie imagem padrão: `static/images/og-default.png` (1200x630px)
2. Para posts específicos, adicione `image: "/images/posts/post.png"` no front matter
3. Use o script para gerar imagens: `python3 scripts/generate_og_image.py "Título" "Descrição" output.png`

## Scripts

### Gerar Imagem Open Graph

```bash
pip install Pillow
python3 scripts/generate_og_image.py "Título" "Descrição" static/images/posts/post.png
```

## Comandos Make

```bash
make server    # Iniciar servidor
make build     # Gerar site
make clean     # Limpar arquivos gerados
make new POST=nome  # Criar novo post
```

## Deploy no GitHub Pages

O projeto está configurado para fazer deploy automático no GitHub Pages usando GitHub Actions.

### Configuração Inicial

1. **Habilitar GitHub Pages no repositório:**
   - Vá em `Settings` > `Pages` no seu repositório GitHub
   - Em `Source`, selecione `GitHub Actions`
   - Salve as alterações

2. **Push do código:**

   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin master
   ```

3. **Verificar o deploy:**
   - Vá em `Actions` no seu repositório GitHub
   - O workflow `Deploy to GitHub Pages` será executado automaticamente
   - Após o sucesso, seu site estará disponível na URL configurada no GitHub Pages

### Deploy Automático

O deploy acontece automaticamente quando você faz push para a branch `master`. O workflow:

- Faz build do site Hugo
- Gera os arquivos estáticos
- Faz deploy no GitHub Pages

### Deploy Manual

Você também pode executar o deploy manualmente:

- Vá em `Actions` > `Deploy to GitHub Pages` > `Run workflow`

### Estrutura do Workflow

O workflow está configurado em `.github/workflows/deploy.yml` e:

- Usa Hugo Extended 0.147.8
- Faz build com minificação
- Faz deploy automático no GitHub Pages
- Suporta temas Hugo com submodules

## Licença

MIT
