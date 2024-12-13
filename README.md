# BetU


## Introdução
<!-- Contexto, motivação da aplicação, requisitos e visão geral do funcionamento da blockchain de apostas -->
<!--Explique brevemente o contexto das apostas esportivas e os desafios enfrentados por plataformas tradicionais (ex.: falta de transparência, centralização, custos elevados, manipulação de resultados).
Introduza a solução proposta: uma aplicação descentralizada baseada em blockchain Ethereum.
Objetivo do trabalho:Desenvolver uma aplicação que permite apostas esportivas de maneira transparente e segura, utilizando contratos inteligentes.
 -->

O mercado de apostas online tem crescido de forma acelerada, impulsionado pela digitalização e pela acessibilidade oferecida por plataformas digitais. A conveniência proporcionada pelas plataformas digitais, que permitem aos usuários realizar apostas diretamente do smartphone ou computador, tornou esse setor amplamente acessível a um público global. Além disso, a diversificação das opções de apostas — desde esportes tradicionais, como futebol e basquete, até eSports e eventos culturais — tem atraído uma base de usuários cada vez mais diversificada. No entanto, esse crescimento também expõe desafios estruturais significativos enfrentados pelas plataformas tradicionais, como a falta de transparência, centralização excessiva, altos custos operacionais e o risco de manipulação de resultados. Também, as casas de apostas que intermediam a operação entre o apostador e evento limita a autonomia dos usuários e pode levar a bloqueios governamentais, restringindo o acesso em determinadas regiões.

Neste cenário, a tecnologia blockchain surge como uma solução promissora, permitindo a criação de sistemas descentralizados que eliminam a necessidade de intermediários e oferecem maior segurança e transparência. Este relatório apresenta a implementação de uma aplicação descentralizada (dApp) numa arquitetura *peer to peer* (P2P) baseada na blockchain Ethereum pelos alunos do curso de Engenharia de Computação da Universidade Estadual de Feira de Santana (UEFS). 

A aplicação desenvolvida permite que os usuários realizaem depósitos, saques, registrem novos eventos de aposta ou participem de eventos já registrados, com odds dinâmicas ajustadas com base nas probabilidades de cada evento. Após o encerramento de um evento, o saldo dos participantes é automaticamente atualizado, e os resultados são armazenados no histórico, disponíveis publicamente na blockchain para garantir transparência e confiabilidade. Desse modo, a solução utiliza contratos inteligentes para automatizar processos, garantindo que todas as transações sejam verificáveis, imutáveis e executadas sem interferências externas, promovendo uma experiência justa e confiável para os usuários.
##  Fundamentação

### Blockchain 
<!--Explique o que é blockchain e como o Ethereum se diferencia, com foco em contratos inteligentes.
Conceitos importantes:
Descentralização.
Imutabilidade e transparência.
Gas fees e como afetam as transações.
Introduza ferramentas como Ganache (blockchain local), Truffle (framework de desenvolvimento) e Metamask (carteira para interação com dApps). -->

#### O Que é Blockchain?
Blockchain é uma forma especial de banco de dados: um livro-razão digital descentralizado mantido por uma rede distribuída de computadores. Os dados são organizados em blocos, dispostos em ordem cronológica e protegidos por criptografia, garantindo transparência, segurança e imutabilidade.
Uma vez confirmados e adicionados à cadeia, os dados não podem ser alterados sem consenso da rede. A descentralização elimina a necessidade de intermediários, permitindo transações diretas entre usuários.

#### Características e Benefícios da Blockchain

* Descentralização: Dados armazenados em múltiplos nós em vez de um servidor central.
*	Transparência: Todos os participantes têm acesso ao mesmo banco de dados.
*	Imutabilidade: Dados não podem ser alterados sem consenso.
* Segurança: Criptografia e mecanismos de consenso evitam manipulações.
*	Eficiência: Transações mais rápidas e econômicas sem intermediários.

#### Funcionamento

1.	Registro de Transações: Transações são validadas por nós na rede.
2.	Formação de Blocos: Transações são agrupadas em blocos, cada qual contendo dados, um timestamp e hashes criptográficos.
3.	Mecanismo de Consenso: Para adicionar um bloco, os nós concordam com sua validade através de algoritmos como Proof of Work (PoW) ou Proof of Stake (PoS).
________________________________________
### Ethereum
Ethereum é uma plataforma descentralizada de código aberto movida pela criptomoeda Ether (ETH). Seu diferencial está na capacidade de executar contratos inteligentes – programas autônomos que realizam ações pré-definidas ao atenderem certas condições.
Essa funcionalidade permite a criação de aplicações descentralizadas (DApps), abrangendo desde finanças descentralizadas (DeFi) até jogos e gestão de cadeia de suprimentos. A infraestrutura robusta do Ethereum o torna uma ferramenta indispensável no avanço de tecnologias descentralizadas

### Contratos Inteligentes
<!--O que são contratos inteligentes? Como eles automatizam processos?
Linguagem de programação usada (Solidity).
Exemplos de funções básicas de contratos inteligentes no contexto de apostas (ex.: criação de eventos, registro de apostas, distribuição de prêmios).
 -->

Contratos inteligentes são acordos digitais programados, armazenados e executados automaticamente na blockchain, sem a necessidade de intermediários. Eles se destacam pela transparência, segurança e eficiência.

Principais Usos:
* Transações financeiras.
* Aplicações descentralizadas (DApps).
*	Seguros, gestão de cadeia de suprimentos, propriedade intelectual e sistemas de votação.

Funcionamento Simplificado:
1.	Criação e implantação: Desenvolvedores programam contratos usando linguagens como Solidity e os integram à blockchain.
2.	Execução automatizada: Condições especificadas no contrato são verificadas pela rede, acionando a execução sem intervenção humana.
3.	Registro imutável: Transações são armazenadas de forma permanente e transparente.
________________________________________

### Aplicações Descentralizadas
<!--Definição e arquitetura de uma dApp.
Interação entre frontend, blockchain e contratos inteligentes.
Papel de bibliotecas como Web3.js ou ethers.js na conexão com a blockchain.
 -->

Uma aplicação descentralizada ou DApps são aplicativos baseados em blockchain que oferecem maior segurança e transparência ao distribuírem o controle entre múltiplos participantes, eliminando servidores centralizados.
Exemplo:
Uma DApp de mídia social armazena postagens diretamente na blockchain, tornando-as acessíveis a toda a rede, sem controle de empresas centralizadas.
Principais Funcionalidades:
*	Finanças descentralizadas (DeFi).
*	Jogos, sistemas de votação e criação de arte digital.

### Apostas Esportivas
<!--Contextualize o mercado de apostas esportivas.
Problemas comuns em plataformas tradicionais (ex.: confiança, manipulação, altas taxas).
Benefícios de usar blockchain nesse cenário.
 -->

 Apostas esportivas envolvem a previsão de resultados de eventos esportivos, com apostas baseadas nessas previsões. O setor tem crescido impulsionado por avanços tecnológicos e regulamentações.
Funcionamento Básico:
1.	Escolha do evento: Apostadores selecionam partidas ou competições.
2.	Tipos de apostas:
  * Simples: Previsão de um único resultado.
  * Múltiplas: Combinação de várias apostas.
  * Ao vivo: Feitas durante o evento.
3.	Cotações (odds): Definem o retorno potencial, variando conforme a probabilidade do evento ocorrer.
4.	Resultado e pagamento: Acertos geram prêmios proporcionais às odds; erros resultam na perda do valor apostado.
A tecnologia blockchain traz inovação às apostas, garantindo transparência e segurança por meio de contratos inteligentes e registros imutáveis.		


## Metodologia
### Arquitetura da Aplicação
<!--Projeto e idealização descrevendo a modelagem dos contratos inteligentes no truffle, as principais funcionalidades (ex.: criar eventos, registrar apostas, resolver resultados), configuração do ambiente e rede local, deploy dos contratos e configuração das contas. Integração com Metamask. -->

<!-- Ethereum, Ganache, Truffle, Solidity, React (ou framework web escolhido), Metamask.
.-->
<!--Componentes principais:
Blockchain Ethereum: Rede onde os contratos inteligentes são implantados.
Ganache: Ambiente local para simular a blockchain Ethereum durante o desenvolvimento.
Truffle: Framework para desenvolver, testar e implantar contratos inteligentes.
Frontend Web (React/Next.js) ou terminal: Interface para os usuários interagirem com os contratos inteligentes.
Metamask: Carteira usada para conectar os usuários à aplicação descentralizada (dApp) 
Explique a escolha dessas ferramentas e seus papéis no projeto
-->
### Fluxo de Funcionamento
<!--
Descreva o fluxo da aplicação:
Usuário conecta sua carteira.
Seleciona um evento esportivo.
Faz uma aposta (transação blockchain).
Resultado do evento é resolvido pelo contrato inteligente.
Recompensas são distribuídas automaticamente.-->

## Resultados

### Funcionalidades Implementadas

<!--Destaque o que foi desenvolvido:
Criação de eventos esportivos.
Registro de apostas no contrato inteligente.
Distribuição automática de prêmios.
Mostre capturas de tela ou exemplos de transações (ex.: hash da transação, interação com o contrato). -->

### Limitações Identificadas
<!--Limitações Identificadas

Custos de gas elevados em redes públicas.
Complexidade na configuração inicial para usuários não familiarizados com blockchain. -->

## Conclusão
<!--Resumo dos Resultados:

Reforce os benefícios da solução proposta, como transparência e segurança.
Destaque como os contratos inteligentes resolveram os problemas identificados.

Aprendizados:

O que foi aprendido sobre blockchain, contratos inteligentes e desenvolvimento de dApps.
Desafios enfrentados e como foram superados.

Trabalhos Futuros:

Migração para redes Layer 2 (ex.: Polygon) para reduzir custos.
Suporte para múltiplas criptomoedas.
Integração com APIs esportivas para resultados automáticos de eventos.
 -->

## Referências