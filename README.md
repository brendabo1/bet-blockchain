<h1 align="center"><i>BetU</i></h1>

<p align="center"> Uma rede Blockchain para apostas online.</p>

## Introdução

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

Blockchain é a tecnologia inovadora de banco de dados que está no coração de quase todas as criptomoedas. Ao distribuir cópias idênticas de um banco de dados por uma rede inteira, o blockchain torna muito difícil hackear ou enganar o sistema. Embora a criptomoeda seja o uso mais popular para blockchain atualmente, a tecnologia oferece o potencial de servir a uma gama muito ampla de aplicações (Rodeck & Curry, 2022). Essencialmente, blockchain é um livro de registro ou livro-razão descentralizado com cópias em cada nó da sua rede, onde as informações são armazenadas em blocos, encadeados cronologicamente e protegidos por criptografia. Em vez de um servidor central, a rede é mantida por computadores distribuídos, eliminando intermediários e assegurando transações diretas. 

Em uma blockchain, as transações são agrupadas em blocos a serem validados pelos nós da rede. Cada bloco possui três componentes principais: os dados das transações, um timestamp que registra quando o bloco foi criado, e um hash criptográfico único que serve como identificador do bloco. Além disso, cada bloco contém o hash do bloco anterior, formando uma cadeia contínua. Essa ligação entre os blocos garante a integridade e a imutabilidade dos dados, já que qualquer alteração em um bloco invalidaria os hashes de todos os blocos subsequentes. Para adicionar um bloco à cadeia, os nós devem concordar sobre sua validade através de algoritmos de consenso como Proof of Work (PoW) ou Proof of Stake (PoS), garantindo que apenas blocos legítimos sejam adicionados à cadeia. No Ethereum, por exemplo, o consenso é alcançado por meio do Proof of Stake (PoS), onde validadores são escolhidos com base na quantidade de criptomoedas que possuem e estão dispostos a "apostar" como garantia de sua honestidade. Durante o processo de validação, as transações são verificadas quanto à autenticidade e ao cumprimento das regras do protocolo. Uma vez validadas, as transações são agrupadas em um bloco, que é submetido ao processo de hashing.

Hashing é uma operação matemática que transforma os dados do bloco em um código alfanumérico fixo de comprimento definido, chamado hash. Este hash é único para cada conjunto de dados, de forma que mesmo uma pequena alteração nos dados gera um hash completamente diferente. Essa característica do hashing, combinada com a ligação dos hashes entre os blocos, torna a blockchain resistente a fraudes. Qualquer tentativa de modificar os dados em um bloco exigiria o recalculo dos hashes de todos os blocos subsequentes, o que é computacionalmente inviável em uma rede descentralizada. Assim, o hashing e a validação conjunta asseguram a segurança, integridade e confiabilidade da blockchain

Assim, para que um bloco seja incluido na cadeia compartilhada, os nós verificam a operação e, caso haja consenso, o um novo bloco gerado é conectado à estrutura, como o fluxo apresentado na Figura 1. Após este estágio, as atualizações são propagadas na rede visando garantir o consenso, imutabilidade, transparência e segurança dos dados. 

É relevante mencionar a distinção entre dois tipos principais de blockchain: as públicas e as privadas. Blockchains públicas são abertas, acessíveis a todos e priorizam transparência, mas podem ser mais lentas e consumir mais energia devido à descentralização total. São ideais para projetos onde a confiança e a auditoria são essenciais.
Blockchains privadas, por sua vez, limitam o acesso a usuários autorizados, sendo controladas por uma entidade ou consórcio. Oferecem maior eficiência e privacidade, tornando-se mais adequadas para aplicações empresariais que exigem desempenho e segurança.

Apesar das vantagens de integridade, segurança, anonimidade e privacidade que uma rede blockchain fornece, existem limitações quanto ao processamento de transações, com alta latência e custos operacionais. Dessa maneira, identificar as necessidades da aplicação é essencial antes do uso da blockchain. A Figura 2 apresenta um esquema intuitivo para entender em quais cenarios essa tecnologia pode ser bemaplicada.
<div align="center">
  <figure>  
    <img src="images/BLOCKCHAIN.png">
    <figcaption>
      <p align="center"> 

**Figura 1** - Fluxo de funcionamento da blockchain.
Fonte: Distrito
    </figcaption>
  </figure>
</div>


<div align="center">
  <figure>  
    <img src="images\Voce precisa de uma blockchain.jpeg">
    <figcaption>
      <p align="center"> 

**Figura 2** - Equema para avaliar a necessidade de uma blockchain
    </figcaption>
  </figure>
</div>


#### Rede Ethereum
Ethereum é uma blockchain que dispõe de um ambiente de execução de seus contratos inteligentes, a Máquina Virtual Ethereum (EVM), e de código aberto que utiliza nativamente a criptomoeda Ether (ETH). Seu diferencial está na capacidade de executar contratos inteligentes, que são programas autoexecutáveis que realizam ações automaticamente quando certas condições são atendidas, permitindo a criação de aplicações descentralizadas (DApps) em diversas áreas como finanças descentralizadas (DeFi), jogos e gestão de cadeia de suprimentos.

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

**Figura 3** - Funcionamento de um Smart Contract
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
Para o desenvolvimento da aplicação descentralizada, a rede blockchain Ethereum foi utilizada bem como o framework Truffle v5.11.5 (core: 5.11.5), Node v22.12.0 e a web3.js v1.10.0 para desenvolver, testar e implantar contratos inteligentes compilados usando o compilador solidity Solc 0.8.19. Já a integração com a carteira digital MetaMask permitiu as funcionalidades de saques e depósitos de maneira intuitiva e eficiante no sistema. 

Para facilitar o desenvolvimento e a simulação de contratos inteligentes, a ferramenta Ganache é amplamente utilizada. Ganache é um ambiente local que emula uma blockchain Ethereum, permitindo a criação de uma rede privada para desenvolvimento e testes. Ele fornece um conjunto de contas pré-configuradas com saldo fictício em Ether, como é apresentado na Figura 4, permitindo que desenvolvedores realizem transações, implantem contratos inteligentes e simulem o comportamento da rede sem custos reais. Através da versão na versão v7.9.1 utilizada no projeto, também foi possível obter informações detalhadas sobre o processamento das transações, como consumo de gás, logs de eventos e alterações no estado dos contratos como é exibido na Figura 5.

<div align="center">
  <figure>  
    <img src="images/contas_ganache.png">
    <figcaption>
      <p align="center"> 

**Figura 4** - Contas e suas chaves privadas criadas automaticamente no ambiente de simulação Ganache

</p>
    </figcaption>
  </figure>
</div>

<div align="center">
  <figure>  
    <img src="images/transações.png">
    <figcaption>
      <p align="center"> 

**Figura 5** - Interface de transações da blockchain no ambiente de simulação Ganache após criar jogos e realizar apostas

</p>
    </figcaption>
  </figure>
</div>

### Arquitetura da Aplicação
<!--Projeto e idealização descrevendo a modelagem dos contratos inteligentes no truffle, as principais funcionalidades (ex.: criar eventos, registrar apostas, resolver resultados), configuração do ambiente e rede local, deploy dos contratos e configuração das contas. Integração com Metamask. -->
A aplicação desenvolvida com blockchain Ethereum privada em uma rede *peer-to-peer* (P2P) é organizada em camadas que interagem para a manutenção coletiva da estrutura de estados. Cada nó na rede representa um dispositivo que executa software Ethereum e se interconecta com outros nós.

A primeira camada na arquitetura cujo usuário pode acessar é a interface web ou frontend, onde as informações, os eventos disponíveis, odds, saldos e históricos de transações podem ser visualizados. A integração com a carteira MetaMask possibilita que o usuário se conecte à aplicação descentralizada (dApp), gerencie suas chaves privadas e assine transações de forma segura, garantindo que somente o proprietário da conta possa autorizar operações. 

Em seguida, as solicitações de serviço do usuário são processadas pelos nós da rede, sendo estes outros usuários e dispositivos que executam software Ethereum e se interconecta com outros nós. Nessa rede, os contratos inteligentes, escritos em Solidity, implementam as regras de negócio, como registro de eventos, execução de apostas, cálculo de odds dinâmicas e distribuição de recompensas. Estes contratos são executados na Máquina Virtual Ethereum de maneira independente e automática nos nós da rede de acordo com os dados da transação. Por fim, a camada de blockchain é a base da aplicação, responsável por armazenar dados críticos e executar contratos inteligentes. O contrato inteligente compilado possui um custo no processamento descontado do nó proprietário que o submente na rede, este custo pode ser analisado na dedução do saldo da conta de index 0 da Figura 6.

<div align="center">
  <figure>  
    <img src="images/contrato_compilado.png">
    <figcaption>
      <p align="center"> 

**Figura 6** - Contas no ambiente de simulação após o deploy do contrato inteligente na rede. A primiera conta representa o proprietário do qual 0.04009944 ETH correspondentes ao custo foram subtraídos.

</p>
    </figcaption>
  </figure>
</div>

A blockchain Ethereum serve como o backend descentralizado da dApp, garantindo a integridade e a imutabilidade das informações. Além disso, a blockchain utiliza o algoritmo de consenso Proof of Stake (PoS) para validar transações de maneira segura e eficiente, eliminando a necessidade de intermediários. É importante destacar que ao simular uma blockchain Ethereum local através do Ganache, o algoritmo de consenso é simplificado para facilitar o desenvolvimento e os testes.

O esquema da Figura 7 apresenta a arquitetura descrita da aplicação. 

<div align="center">
  <figure>  
    <img src="images\arquitetura dapp.jpg" width="500px">
    <figcaption>
      <p align="center"> 

**Figura 7** - Arquitetura da aplicação descentralizada com blockchain Ethereum

</p>
    </figcaption>
  </figure>
</div>

### Fluxo de Funcionamento
<!-- 2 vias, sorte simples, 
Descreva o fluxo da aplicação:
Usuário conecta sua carteira.
Seleciona um evento esportivo.
Faz uma aposta (transação blockchain).
Resultado do evento é resolvido pelo contrato inteligente.
Recompensas são distribuídas automaticamente.-->

O fluxo de operação da dApp começa com a conexão do usuário, que acessa a aplicação por meio de um navegador compatível com MetaMask, como oGoogle Chrome ou Firefox. O acesso à sua carteira MetaMask é requisitado e essencial para a identificação do usuário para o sistema. Em seguida, o jogador pode escolher qual ação deseja realizar: cadastrar um evento, realizar uma aposta, realizar um saque ou depósito. 

Ao apostar em um evento, o usuário identifica o jogo desejado a partir do ID, o time em que deseja apostar e a quantia, criando assim uma transação na blockchain. Esta operação é autenticada pela assinatura digital MetaMask, por meio da chave privada armazenada localmente na carteira do usuário. Após a assinatura, a transação é transmitida para os nós da rede Ethereum em um bloco a ser validado através de cálculos matemáticos. Quando validado, o bloco é adicionado à blockchain e o estado atualizado. No caso de apostas ou saques, o saldo do usuário é verificado para registrar a operação. Em um jogo, por exemplo, de ter ou não ter greve em uma universidade federal, os usuários Maria e Flávio com contas de index 3 e 5, respectivamente, resolvem fazer uma aposta. Maria aposta 5 ETH de que vai ter greve e Flávio aposta 10 ETH de que não terá greve, como demonstram os debitos das contas de index 3 e 4 na Figura 8 das apostas realizadas. Ao final do semestre, não houve greve e Flávio ganha a aposta, tendo seu saldo incrementaod automaticamente como apresenta a Figura 9. 


No cenário da criação de um evento, o usuário deve indicar o nome, e o time A e B, em que apenas uma das 2 opções será vencedora a exemplo do lançamento de uma moeda. O tipo do jogo permite definir o cálculo fracionário da odd e da distribuição dos ganhos. Dessa maneira, ao atender às condições definidas, o evento é criado e estará disponível na blockchain para qualquer usuário realizar uma aposta. 

Após a conclusão de um evento, o contrato inteligente é responsável pela distribuição automática dos prêmios aos vencedores, sem a necessidade de intervenção manual. Através da blockchain, o processo de distribuição de prêmios é realizado de forma rápida e transparente, com base nas odds e nos resultados previamente definidos. A utilização de contratos inteligentes assegura que todos os participantes que acertaram seus palpites sejam recompensados de forma justa e oportuna, minimizando erros e disputas sobre os resultados. Esse processo não só aumenta a eficiência das transações, mas também fortalece a confiança na plataforma, pois a distribuição de prêmios é executada de maneira completamente automatizada e imutável.

<div align="center">
  <figure>  
    <img src="images/aposta_greve_realizada.png">
    <figcaption>
      <p align="center"> 

**Figura 8** - Contas e seus saldos após a realização de uma aposta pelos usuários de index 3 e 4 em um evento ativo.

</p>
    </figcaption>
  </figure>
</div>

<div align="center">
  <figure>  
    <img src="images/resultado_aposta_greve.png">
    <figcaption>
      <p align="center"> 

**Figura 9** - Saldo das contas após o fim do evento "Greve:?" e distribuição dos prêmios.

</p>
    </figcaption>
  </figure>
</div>

## Resultados

### Funcionalidades Implementadas

<!--Destaque o que foi desenvolvido:
Criação de eventos esportivos.
Registro de apostas no contrato inteligente.
Distribuição automática de prêmios.. -->

- <b>Criação de Eventos Esportivos:</b> Ao acessar a plataforma, o usuário pode cadastrar novos eventos de apostas esportivas na página principal. Assim, escolhendo o nome do evento, o time 1 e o time 2. Quando seu evento é registrado com sucesso na blockchain, a exemplo dos 3 jogos criados e listados no console da Figura 10, ele fica disponível para que outros usuários realizem apostas. 

<div align="center">
  <figure>  
    <img src="images/jogos_criados_2.png" >
    <figcaption>
      <p align="center"> 

**Figura 10** - Jogos criados com sucesso

</p>
    </figcaption>
  </figure>
</div>

- <b>Odd dinâmica:</b> A odd de cada time em um jogo é calculada dinamicamente em função do total de apostas dividido pelas apostas no respectivo time. Dessa maneira, a odd será maior em times com menos apostas, atraindo os apostadores pela possibilidade de maior ganho, e menor no time com mais valores em apostas. 

- <b>Registro de Apostas:</b> Quando o usuário deseja apostar, ele acessa os jogos disponíveis e seleciona em qual aposta deseja participar, atravé do ID do jogo. Em seguida, o usuário determina o  valor a ser apostado respeitando o mínimo de 0.01 ETH, os blocos são minerados, as quantias debitadas das contas e a aposta registrada. O valor da aposta e as odds são salvas na blockchain, garantindo transparência e imutabilidade das transações. Para simplificar a solução, cada jogador pode realizar apenas 1 aposta por jogo.

- <b>Distribuição Automática de Prêmios:</b> Após o término de um evento esportivo, o sistema verifica o time ganhador e executa o contrato inteligente para distribuir o prêmio entre os vencedores. Em caso de vitória, o usuário receberá um valor em função da odd no momento da aposta, do valor apostado e do total a ser distribuído. O processo de distribuição é rápido e ocorre sem a necessidade de intervenção manual, garantindo que os prêmios sejam entregues de maneira justa e transparente, diretamente para as carteiras dos vencedores. Por exemplo, em um jogo do brasileirão criado no sistema em que os times são Time 1: Vasco e Time 2: Qualquer Time, João (index 2), Maria (index 3) e Flávio (index 4) apostaram, respectivamente 2, 5 e 10 ETH do saldo de 100 ETH disponível, na vitória de "Qualquer Time". Já Carlos (index 1) foi o único apostador na vitória do Vasco com uma aposta de 1 ETH. Ao final do jgo, o Vasco é vitorioso e a distribuição dos prêmios é simulada na Figura 11. Todas as transações de apostas e pagamentos são registradas e visíveis a todos na blockchain, assegurando que não haja manipulação nos resultados.

<div align="center">
  <figure>  
    <img src="images/vitoria vasco.png">
    <figcaption>
      <p align="center"> 

**Figura 11** - Decréscimo no saldo dos apostadores e distribuição do prêmio na vitória do vasco no jogo criado

</p>
    </figcaption>
  </figure>
</div>

- <b>Saque e Depósito:</b> Na aplicação, o usuário pode realizar depósitos e saques diretamente usando sua carteira Metamask. Para o depósito, o usuário transfere criptomoeda (como Ether) para o endereço indicado, e o saldo é atualizado automaticamente após a confirmação na blockchain. Já no saque, o usuário escolhe o valor a ser retirado e a transação é enviada para seu endereço de carteira.

## Conclusão
<!--Resumo dos Resultados:

Reforce os benefícios da solução proposta, como transparência e segurança.
Destaque como os contratos inteligentes resolveram os problemas identificados.

Aprendizados:

O que foi aprendido sobre blockchain, contratos inteligentes e desenvolvimento de dApps.
Desafios enfrentados e como foram superados.


 -->

 A aplicação de apostas baseada em blockchain Ethereum representa um avanço significativo em relação às plataformas tradicionais, trazendo soluções inovadoras para desafios como centralização, falta de transparência e altos custos operacionais. Com a utilização de contratos inteligentes, a dApp elimina a necessidade de intermediários, garantindo que todas as transações e resultados sejam processados de maneira automática, transparente e imutável. A integração com a carteira MetaMask também oferece uma experiência segura e intuitiva, permitindo que os usuários gerenciem suas apostas e fundos diretamente.

Além disso, a arquitetura descentralizada não apenas promove a confiabilidade do sistema, mas também mitiga o risco de manipulação de dados e bloqueios governamentais, assegurando que os resultados dos eventos sejam acessíveis a todos de forma pública. A implementação de odds dinâmicas e a gestão de depósitos e saques tornam a plataforma robusta e adaptável, enquanto a transparência inerente à blockchain reforça a confiança dos usuários.

Essa solução demonstra o potencial transformador da tecnologia blockchain em criar sistemas mais justos e eficientes, destacando-se como uma alternativa viável às casas de apostas convencionais. Embora desafios como escalabilidade e custos de transação ainda existam, os benefícios superam as limitações, consolidando a aplicação como uma proposta moderna e alinhada às demandas de um mercado cada vez mais digital e descentralizado.

## Referências

Binance Academy. (n.d.). Binance Academy. Retrieved from https://academy.binance.com/en/. Acesso em: 10 dez. 2024

Ethereum Foundation. (n.d.). Documentação para desenvolvedores. Ethereum. https://ethereum.org/pt-br/developers/docs/. Acesso em: 10 dez. 2024

101Blockchains. Você Precisa de Blockchain?. Disponível em: https://101blockchains.com/pt/voce-precisa-de-blockchain/. Acesso em: 13 dez. 2024.

MetaMask. (n.d.). Referência de Ethereum. MetaMask. https://docs.metamask.io/services/reference/ethereum/. Acesso em: 12 dez. 2024

Rodeck, David, and Benjamin Curry. "What is blockchain." Forbes (2022).

Truffle Suite. Documentação do Truffle. Disponível em: https://archive.trufflesuite.com/docs/truffle/. Acesso em: 13 dez. 2024.

Truffle Suite. Documentação do Ganache. Disponível em: https://archive.trufflesuite.com/docs/ganache/. Acesso em: 13 dez. 2024.

MB. O que é Ethereum. Disponível em: https://www.mb.com.br/economia-digital/guia/o-que-e-ethereum/. Acesso em: 13 dez. 2024.
