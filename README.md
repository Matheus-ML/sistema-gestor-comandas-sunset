<h1 align="center" style="color:#f97316;">
🌅 Sistema Sunset
</h1>

<p align="center">
<strong>Sistema de Gestão de Comandas para Bares, Restaurantes e Quadras Esportivas</strong>
</p>

<p align="center">
<span style="color:#0c4a6e;"><strong>Agilidade • Controle • Segurança Financeira</strong></span>
</p>

---

## 🌇 Sobre o Projeto

O <strong>Sistema Sunset</strong> é uma aplicação desktop desenvolvida para organizar o fluxo de <strong>comandas, pedidos e pagamentos</strong> em ambientes como:

- 🍹 Bares e Beach Clubs  
- 🍽 Restaurantes  
- ⚽ Quadras Esportivas  

A solução foi criada com foco em **agilidade operacional** e **segurança financeira**, eliminando o estresse do controle manual e reduzindo erros no fechamento de contas.

Com o sistema, o gestor ganha liberdade para focar no atendimento e na experiência do cliente, sabendo que toda a operação está sob controle.

---

## 🚀 Principais Funcionalidades

✔ Abertura e gerenciamento de comandas  
✔ Lançamento de produtos com busca inteligente  
✔ Pesquisa rápida de comandas abertas  
✔ Cálculo automático do total consumido  
✔ Interface moderna e responsiva  
✔ Geração de executável para uso local  

---

## 🎯 Objetivo da Solução

O Sistema Sunset organiza o fluxo financeiro da operação, trazendo:

- 🔒 Maior controle sobre consumos
- ⚡ Agilidade nos lançamentos
- 📊 Redução de erros humanos
- 💰 Segurança no fechamento de caixa
- 🤝 Mais tempo para o gestor focar no cliente

---

## 🛠 Tecnologias Utilizadas

- React  
- TypeScript  
- Vite  
- TailwindCSS  
- Electron (empacotamento desktop)  
- Google Gemini API  

---

## 🤖 Uso de Inteligência Artificial

Este projeto foi desenvolvido com apoio do <strong>Google AI Studio (Gemini)</strong> como ferramenta auxiliar durante o processo de construção.

A IA foi utilizada para:

- Estruturação inicial de componentes
- Sugestões de melhoria
- Apoio na resolução de erros
- Otimização de lógica

Toda a integração, testes, adaptações, correções e decisões finais foram realizadas manualmente.

O uso da IA teve como objetivo acelerar o aprendizado e demonstrar a aplicação prática de ferramentas modernas no desenvolvimento de software.

---

## 🧠 Diferencial do Projeto

Este sistema demonstra:

- Capacidade de resolver problemas reais
- Persistência no desenvolvimento
- Uso consciente de Inteligência Artificial
- Aplicação prática de tecnologias modernas
- Construção de solução funcional com deploy executável

---

## ⚙️ Como Executar o Projeto

Este projeto pode ser executado em modo de desenvolvimento ou gerar uma versão para produção.

---

### 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- Node.js (versão 18 ou superior recomendada)
- npm (geralmente instalado junto com o Node)
- Git (opcional, mas recomendado)

Para verificar se já possui instalado, no CMD digite:
```bash
node -v
npm -v
```

### 📦 1. Clonar o Repositório

```bash
git clone https://github.com/Matheus-ML/sistema-gestor-comandas.git
cd sistema-gestor-comandas
```

### 📥 2. Instalar Dependências
```bash
npm install
```
Esse comando instalará todas as bibliotecas necessárias para o funcionamento do sistema.

Caso o comando `node -v` não funcione, será necessário instalar o Node.js:

1. Acesse https://nodejs.org
2. Baixe a versão LTS
3. Instale normalmente
4. Reinicie o terminal

### 💻 4. Executar em Ambiente de Desenvolvimento
```bash
npm run dev
```
O sistema será iniciado e poderá ser acessado via navegador local (normalmente em http://localhost:5173).

### 🏗 5. Gerar Build para Produção
```bash
npm run build
```
Esse comando criará a versão otimizada do projeto na pasta dist.

### 🖥 6. Gerar Executável Desktop (Electron)
Caso o projeto esteja configurado com Electron:
```bash
npm run electron:build
```
Será gerado um executável pronto para instalação e uso local.
