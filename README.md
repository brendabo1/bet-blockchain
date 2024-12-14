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

### Blockchain & Ethereum 
<!--Explique o que é blockchain e como o Ethereum se diferencia, com foco em contratos inteligentes.
Conceitos importantes:
Descentralização.
Imutabilidade e transparência.
Gas fees e como afetam as transações.
Introduza ferramentas como Ganache (blockchain local), Truffle (framework de desenvolvimento) e Metamask (carteira para interação com dApps). -->

Blockchain é a tecnologia inovadora de banco de dados que está no coração de quase todas as criptomoedas. Ao distribuir cópias idênticas de um banco de dados por uma rede inteira, o blockchain torna muito difícil hackear ou enganar o sistema. Embora a criptomoeda seja o uso mais popular para blockchain atualmente, a tecnologia oferece o potencial de servir a uma gama muito ampla de aplicações (Rodeck & Curry, 2022). Essencialmente, blockchain é um livro de registro descentralizado com cópias em cada nó da sua rede, onde as informações são armazenadas em blocos, encadeados cronologicamente e protegidos por criptografia. Em vez de um servidor central, a rede é mantida por computadores distribuídos, eliminando intermediários e assegurando transações diretas. 

No funcionamento da blockchain, as transações são validadas pelos nós da rede, agrupadas em blocos com dados, timestamp e hashes criptográficos. Para adicionar um bloco à cadeia, os nós devem concordar sobre sua validade através de algoritmos de consenso como Proof of Work (PoW) ou Proof of Stake (PoS). As transações agrupadas dentro de blocos contém também informações do bloco anterior, de modo a evitar adulterações. Assim, para que um bloco seja incluido na "cadeia" compartilhada, os nós verificam a operação e, caso haja consenso, o um novo bloco gerado é conectado à estrutura. Após este estágio, as atualizações são propagadas na rede visando garantir o consenso, imutabilidade, transparência e segurança dos dados. Os dados de um bloco não podem ser alterados sem mudar todos os blocos subsequentes, o que exigiria o consenso de toda a rede. 
Para entender quando é necessario a utilização de uma blockchain, é necessario entender em quais cenarios essa tecnologia pode ser aplicada, por exemplo:

<div align="center">
  <figure>  
    <img src="images\Voce precisa de uma blockchain.jpeg">
    <figcaption>
      <p align="center"> 

**Figura 1** - Fluxograma para avaliar a necessidade de uma blockchain
    </figcaption>
  </figure>
</div>
No funcionamento da blockchain, as transações são validadas pelos nós da rede, agrupadas em blocos com dados, timestamp e hashes criptográficos. Para adicionar um bloco à cadeia, os nós devem concordar sobre sua validade através de algoritmos como Proof of Work (PoW) ou Proof of Stake (PoS).

Ethereum é uma blockchain que dispoe de um ambiente de execução de seus contratos inteligentes, a Máquina Virtual Ethereum (EVM), e de código aberto que utiliza nativamente a criptomoeda Ether (ETH). Seu diferencial está na capacidade de executar contratos inteligentes, que são programas autoexecutáveis que realizam ações automaticamente quando certas condições são atendidas, permitindo a criação de aplicações descentralizadas (DApps) em diversas áreas como finanças descentralizadas (DeFi), jogos e gestão de cadeia de suprimentos.

Além disso, ferramentas e extensões compatíveis com a blockchain ethereum favorecem seu uso, como Ganache, um ambiente local para simular a blockchain Ethereum durante o desenvolvimento e testes, Truffle, um framework para criação e deploy de contratos inteligentes, e Metamask, uma carteira para interação com DApps, são essenciais para o desenvolvimento e a interação com a rede Ethereum.

### Contratos Inteligentes
<!--O que são contratos inteligentes? Como eles automatizam processos?
Linguagem de programação usada (Solidity).
Exemplos de funções básicas de contratos inteligentes no contexto de apostas (ex.: criação de eventos, registro de apostas, distribuição de prêmios).
 -->

Contratos inteligentes são acordos digitais programados para execução automática na blockchain, sem a necessidade de intermediários. Eles são transparentes, seguros e eficientes, garantindo que condições definidas sejam atendidas sem alterações externas. Entre seus principais usos estão transações financeiras, DApps, seguros, gestão de cadeia de suprimentos, propriedade intelectual e sistemas de votação.

Os desenvolvedores escrevem contratos usando Solidity e os implantam na blockchain para que, quando as condições são atendidas, a rede valide e execute a ação automaticamente, registrando tudo de forma imutável e transparente.

<div align="center">
  <figure>  
    <img src="images\Untitled.jpg" width="600px">
    <figcaption>
      <p align="center"> 

**Figura 2** - Funcionamento de um Smart Contract
    </figcaption>
  </figure>
</div>

No contexto de apostas, contratos inteligentes podem ser usados para criar eventos, registrar apostas e distribuir prêmios automaticamente após o resultado. Isso inclui definir odds, registrar valores apostados e distribuir os prêmios aos vencedores de forma automatizada.
________________________________________

### Aplicações Descentralizadas
<!--Definição e arquitetura de uma dApp.
Interação entre frontend, blockchain e contratos inteligentes.
Papel de bibliotecas como Web3.js ou ethers.js na conexão com a blockchain.
 -->

Uma DApp (Aplicação Descentralizada) é um aplicativo baseado em blockchain, sem servidores centralizados, oferecendo segurança e transparência ao distribuir o controle entre os participantes. Sua arquitetura é composta pelo frontend (interface do usuário), a blockchain (onde os dados são armazenados de forma imutável) e os contratos inteligentes (programas que executam ações automaticamente). O frontend interage com a blockchain e os contratos inteligentes, enviando e recebendo informações.

Bibliotecas como Web3.js e ethers.js são usadas para conectar o frontend à blockchain, facilitando a comunicação e execução de transações e contratos inteligentes, permitindo a criação de DApps de maneira mais simples e segura.

### Apostas Esportivas
<!--Contextualize o mercado de apostas esportivas.
Problemas comuns em plataformas tradicionais (ex.: confiança, manipulação, altas taxas).
Benefícios de usar blockchain nesse cenário.
 -->

O mercado de apostas esportivas tem crescido impulsionado por avanços tecnológicos e pela regulamentação em vários países. Em plataformas tradicionais, há problemas como falta de confiança, manipulação de resultados e altas taxas de intermediários. No funcionamento das apostas, os apostadores escolhem eventos e tipos de apostas, como simples, múltiplas e ao vivo, com as odds determinando o retorno potencial.

A utilização de blockchain nas apostas oferece benefícios significativos, como maior transparência, pois todas as transações ficam registradas publicamente e são imutáveis. A segurança também é aprimorada por meio de criptografia e contratos inteligentes, que protegem os dados e os pagamentos, evitando fraudes. Além disso, a eliminação de intermediários torna as transações mais rápidas e com custos mais baixos, oferecendo uma plataforma mais justa e eficiente em comparação com as tradicionais.


## Metodologia
Para o desenvolvimento da aplicação descentralizada, a rede blockchain Ethereum foi utilizada bem como o framework Truffle para desenvolver, testar e implantar contratos inteligentes. Já a integração com a carteira digital MetaMask permitiu as funcionalidades de saques e depósitos de maneira intuitiva e eficiante no sistema. Além disso, visando simular uma blockchain Ethereum local, a ferramenta Ganache foi utilizada.

### Arquitetura da Aplicação
<!--Projeto e idealização descrevendo a modelagem dos contratos inteligentes no truffle, as principais funcionalidades (ex.: criar eventos, registrar apostas, resolver resultados), configuração do ambiente e rede local, deploy dos contratos e configuração das contas. Integração com Metamask. -->
A aplicação desenvolvida com blockchain Ethereum privada em uma rede *peer-to-peer* (P2P) é organizada em camadas que interagem para a manutenção coletiva da estrutura de estados. Cada nó na rede representa um dispositivo que executa software Ethereum e se interconecta com outros nós.

A primeira camada na arquitetura cujo usuário pode acessar é a interface web ou frontend, onde as informações, os eventos disponíveis, odds, saldos e históricos de transações podem ser visualizados. A integração com a carteira MetaMask possibilita que o usuário se conecte à aplicação descentralizada (dApp), gerencie suas chaves privadas e assine transações de forma segura, garantindo que somente o proprietário da conta possa autorizar operações. Em seguida, os contratos inteligentes, escritos em Solidity, implementam as regras de negócio, como registro de eventos, execução de apostas, cálculo de odds dinâmicas e distribuição de recompensas. Estes contratos são executados na Máquina Virtual Ethereum de maneira independente e automática nos nós da rede de acordo com os dados da transação. Por fim, a camada de blockchain é a base da aplicação, responsável por armazenar dados críticos e executar contratos inteligentes. A blockchain Ethereum serve como o backend descentralizado da dApp, garantindo a integridade e a imutabilidade das informações. Além disso, a blockchain utiliza o algoritmo de consenso Proof of Stake (PoS) para validar transações de maneira segura e eficiente, eliminando a necessidade de intermediários. É importante destacar que ao simular uma blockchain Ethereum local através do Ganache, o algoritmo de consenso é simplificado para facilitar o desenvolvimento e os testes.

O esquema da Figura 3 apresenta a arquitetura descrita da aplicação. 

<div align="center">
  <figure>  
    <img src="images\arquitetura dapp.jpg" width="600px">
    <figcaption>
      <p align="center"> 

**Figura 2** - Exemplo da intercomunicação entre duas vias por meio de soquetes no modelo cliente-servidor

</p>
    </figcaption>
  </figure>
</div>

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

Binance Academy. (n.d.). Binance Academy. Retrieved from https://academy.binance.com/en/. Acesso em: 10 dez. 2024

Ethereum Foundation. (n.d.). Documentação para desenvolvedores. Ethereum. https://ethereum.org/pt-br/developers/docs/. Acesso em: 10 dez. 2024

101Blockchains. Você Precisa de Blockchain?. Disponível em: https://101blockchains.com/pt/voce-precisa-de-blockchain/. Acesso em: 13 dez. 2024.

MetaMask. (n.d.). Referência de Ethereum. MetaMask. https://docs.metamask.io/services/reference/ethereum/. Acesso em: 12 dez. 2024

Rodeck, David, and Benjamin Curry. "What is blockchain." Forbes (2022).

Truffle Suite. Documentação do Truffle. Disponível em: https://archive.trufflesuite.com/docs/truffle/. Acesso em: 13 dez. 2024.

Truffle Suite. Documentação do Ganache. Disponível em: https://archive.trufflesuite.com/docs/ganache/. Acesso em: 13 dez. 2024.

MB. O que é Ethereum. Disponível em: https://www.mb.com.br/economia-digital/guia/o-que-e-ethereum/. Acesso em: 13 dez. 2024.
