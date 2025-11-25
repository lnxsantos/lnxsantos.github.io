---
title: "Configuração de Laboratório: ThinkPad X230 com Fedora Linux"
date: 2025-11-23
draft: true
description: "Documentação técnica do ambiente de laboratório: hardware, sistema operacional, configurações de segurança e ferramentas utilizadas para análise forense e investigação digital."
keywords:
  - "laboratório forense"
  - "thinkpad x230"
  - "fedora security"
  - "linux hardening"
  - "labs forense digital"
  - "ambiente de investigação"
image: "/images/posts/jornada-cyber.png"
---

## Objetivo

Documentar a configuração do ambiente de laboratório utilizado para análise forense, testes de segurança e investigação digital. Este setup serve como base para procedimentos de hardening, análise de artefatos e validação de técnicas.

## Hardware: ThinkPad X230

{{< case title="Configuração do Laboratório" impact="Ambiente isolado para testes e análise" date="2024" >}}
ThinkPad X230 rodando Fedora Linux — estação de trabalho dedicada para laboratório forense.
{{< /case >}}

### Especificações Técnicas

- **Modelo**: ThinkPad X230
- **Processador**: Intel Core i5-3320M
- **RAM**: 8GB DDR3
- **Armazenamento**: SSD com criptografia LUKS2
- **Sistema Operacional**: Fedora Linux (última versão estável)

### Justificativa da Escolha

- Modularidade: fácil desmontagem e modificação
- Compatibilidade: suporte completo a distribuições Linux
- Isolamento: ambiente dedicado, separado de sistemas de produção
- Custo-benefício: hardware adequado para testes sem investimento elevado

## Sistema Operacional: Fedora Linux

### Seleção do Sistema Base

Fedora foi escolhido por:

- **SELinux**: implementação padrão e ativa, essencial para entender políticas de segurança
- **Systemd**: gerenciamento moderno de serviços e unidades
- **Journald**: sistema de logs integrado para auditoria
- **Kernel moderno**: suporte a recursos recentes de segurança
- **Repositórios**: acesso a ferramentas atualizadas sem presets de segurança

### Configurações de Segurança

#### Criptografia de Disco

- **Método**: LUKS2 com Argon2id
- **Parâmetros**: ajustados para equilíbrio entre segurança e performance
- **Observação**: configurações extremas podem impactar tempo de boot

#### Hardening do Sistema

- **ASLR**: ativado e configurado
- **Kernel Lockdown**: modo restritivo habilitado
- **Mount flags**: `/tmp` com `noexec`, `nosuid`, `nodev`
- **SELinux**: modo enforcing, políticas customizadas quando necessário
- **Firewall**: configuração manual via `firewalld`

### Ferramentas Instaladas

- Análise de rede: `tcpdump`, `wireshark`, `bettercap`
- Forense: `volatility`, `autopsy`, `sleuthkit`
- OSINT: `theHarvester`, `recon-ng`, `maltego`
- Análise de memória: `volatility`, `rekall`
- Análise de logs: `logwatch`, `auditd`

## Metodologia de Trabalho

### Ciclo de Aprendizado

1. **Estudo teórico**: fundamentos e documentação
2. **Reprodução no laboratório**: implementação prática
3. **Aplicação em CTFs**: validação em cenários controlados
4. **Documentação**: registro de procedimentos e resultados

### Estrutura de Documentação

Cada procedimento documentado segue:

- **Cenário**: contexto e objetivo
- **Metodologia**: passos executados
- **Ferramentas**: software e comandos utilizados
- **Evidências**: resultados e artefatos coletados
- **Análise**: correlação e interpretação
- **Conclusão**: achados técnicos

## Configurações Específicas

### Criptografia LUKS2

**Problema identificado**: boot lento (4 minutos) devido a parâmetros Argon2id extremos.

**Solução aplicada**: ajuste de parâmetros de derivação de chave para equilíbrio segurança/performance.

**Lição aprendida**: segurança sem equilíbrio impacta usabilidade operacional.

### Hardening Linux

**Configurações aplicadas**:

- `/etc/fstab`: flags de montagem restritivas
- Initramfs: configuração para suporte a criptografia
- Permissões de kernel: restrições via sysctl
- SELinux: políticas customizadas quando necessário

**Observações**:

- Logs de auditoria SELinux são essenciais para troubleshooting
- `noexec` em `/tmp` pode quebrar ferramentas que dependem de execução temporária
- Lockdown Mode do kernel restringe modificações em runtime

### Análise de Redes

**Metodologia**:

- Captura de tráfego via `tcpdump` e `wireshark`
- Análise de handshakes WPA2
- Captura de beacon frames em modo monitor
- Estudo de frames 802.11

**Ferramentas utilizadas**: `airodump-ng`, `kismet`, `bettercap`

## Validação e Testes

### CTFs e Laboratórios

- **TryHackMe**: base teórica e prática
- **Hack The Box**: cenários realistas
- **CTFs**: validação de metodologias

### Processo de Validação

1. Estudo do cenário
2. Execução no laboratório
3. Documentação de procedimentos
4. Análise de resultados
5. Refinamento de metodologia

## Manutenção e Atualização

### Rotina de Manutenção

- Atualização de sistema: semanal
- Atualização de ferramentas: conforme necessidade
- Backup de configurações: antes de mudanças significativas
- Documentação: atualização contínua

### Backup

- Configurações críticas versionadas
- Scripts de automação documentados
- Logs de auditoria arquivados

## Referências Técnicas

- Documentação oficial do Fedora
- Manuais de ferramentas utilizadas
- RFCs relevantes para protocolos analisados
- Documentação de segurança do kernel Linux
