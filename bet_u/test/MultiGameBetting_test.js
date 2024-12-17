const MultiGameBetting = artifacts.require("MultiGameBetting");

contract("MultiGameBetting", (accounts) => {
  const owner = accounts[0];
  const bettor1 = accounts[1];
  const bettor2 = accounts[2];
  const bettor3 = accounts[3];
  const bettor4 = accounts[4];
  // const gameName = "Team A vs Team B";
  // const team1 = "Team A";
  // const team2 = "Team B";

  it("Deve criar um jogo com sucesso", async () => {
    const betting = await MultiGameBetting.deployed();
    //await betting.createGame(gameName, team1, team2, { from: owner });
    // Criação de 3 jogos
    console.log("\n==> Criando 3 jogos...");
    await betting.createGame("Cara ou Coroa", "Cara", "Coroa", { from: owner });
    await betting.createGame("Greve", "Sim", "Não", { from: owner });
    await betting.createGame("Brasileirão", "Vasco", "Qualquer Time", { from: owner });

    // Listar jogos ativos
    console.log("\nJogos ativos:");
    const activeGames = await betting.listActiveGames();
    console.log(activeGames.map((id) => `Game ID: ${id.toString()}`).join(", "));

    // Verificação de que os jogos foram criados
    assert.equal(activeGames.length, 3, "Deve haver 3 jogos ativos");
    // Detalhes de cada jogo criado
    for (let i = 1; i <= 3; i++) {
      const gameDetails = await betting.getGameDetails(i);
      console.log(`Jogos criados ${i}:`, {
        Nome: gameDetails.gameName,
        TotalBets: gameDetails.totalBets.toString(),
        Team1: gameDetails.team1Name,
        Team2: gameDetails.team2Name,
        Ativo: gameDetails.isActive,
      });
    }
    // Fazer apostas em cada jogo
    console.log("\n==> Realizando apostas...");
    const betAmount1 = web3.utils.toWei("1", "ether");
    const betAmount2 = web3.utils.toWei("2", "ether");
    const betAmount3 = web3.utils.toWei("5", "ether");
    const betAmount4 = web3.utils.toWei("10", "ether");

    // Saldo antes da distribuição
    const balanceBeforeBettor1 = await web3.eth.getBalance(bettor1);
    const balanceBeforeBettor2 = await web3.eth.getBalance(bettor2);
    const balanceBeforeBettor3 = await web3.eth.getBalance(bettor3);
    const balanceBeforeBettor4 = await web3.eth.getBalance(bettor4);
    console.log("\nSaldos antes da distribuição:");
    console.log(`Apostador1: ${web3.utils.fromWei(balanceBeforeBettor1, "ether")} ETH`);
    console.log(`Apostador2: ${web3.utils.fromWei(balanceBeforeBettor2, "ether")} ETH`);
    console.log(`Apostador3: ${web3.utils.fromWei(balanceBeforeBettor3, "ether")} ETH`);
    console.log(`Apostador4: ${web3.utils.fromWei(balanceBeforeBettor4, "ether")} ETH`);

    // Game 1: Apostador1 aposta em cara, Apostador2 aposta em coroa, Apostador3 aposta em coroa
    await betting.placeBet(1, 0, { from: bettor1, value: betAmount1 });
    await betting.placeBet(1, 1, { from: bettor2, value: betAmount2 });
    await betting.placeBet(1, 1, { from: bettor3, value: betAmount3 });

    // Game 2: Apostador3 aposta no Sim greve, Apostador4 aposta no Nao greve
    await betting.placeBet(2, 0, { from: bettor3, value: betAmount3 });
    await betting.placeBet(2, 1, { from: bettor4, value: betAmount4 });

    // Game 3: Apostador1 aposta no Vasco, Apostador2, 3 e 4 apostam em Qualquer Time
    await betting.placeBet(3, 0, { from: bettor1, value: betAmount1 });
    await betting.placeBet(3, 1, { from: bettor2, value: betAmount2 });
    await betting.placeBet(3, 1, { from: bettor3, value: betAmount3 });
    await betting.placeBet(3, 1, { from: bettor4, value: betAmount4 });


    // Detalhes de cada jogo apos apostas
    for (let i = 1; i <= 3; i++) {
      const gameDetails = await betting.getGameDetails(i);
      console.log(`Detalhes do Jogo ${i}:`, {
        Nome: gameDetails.gameName,
        TotalBets: gameDetails.totalBets.toString(),
        Team1: gameDetails.team1Name,
        Team2: gameDetails.team2Name,
        Ativo: gameDetails.isActive,
      });
    }

    // Definir vencedores e distribuir prêmios
    console.log("\n==> Definindo vencedores e distribuindo prêmios...");
    await betting.distributePrizes(1, 0, { from: owner }); // Cara vence Game 1
    await betting.distributePrizes(2, 1, { from: owner }); // Não greve vence Game 2
    await betting.distributePrizes(3, 0, { from: owner }); // Qualquer Time vence Game 3
 
    // Saldo após a distribuição
    const balanceAfterBettor1 = await web3.eth.getBalance(bettor1);
    const balanceAfterBettor2 = await web3.eth.getBalance(bettor2);
    const balanceAfterBettor3 = await web3.eth.getBalance(bettor3);
    const balanceAfterBettor4 = await web3.eth.getBalance(bettor4);
    console.log("\nSaldos após a distribuição:");
    console.log(`Apostador1: ${web3.utils.fromWei(balanceAfterBettor1, "ether")} ETH`);
    console.log(`Apostador2: ${web3.utils.fromWei(balanceAfterBettor2, "ether")} ETH`);
    console.log(`Apostador1: ${web3.utils.fromWei(balanceAfterBettor3, "ether")} ETH`);
    console.log(`Apostador2: ${web3.utils.fromWei(balanceAfterBettor4, "ether")} ETH`);

    // Exibir resultados
    console.log("\n==> Resultados dos jogos:");
    console.log("Game 1: Cara venceu");
    console.log("Game 2: Não greve venceu");
    console.log("Game 3: Qualquer Time venceu");

    // console.log("\n==> Ganhadores e Perdedores:");
    // console.log("Game Cara ou Coroa:");
    // console.log(`  Apostador1 (Cara): Ganhador`);
    // console.log(`  Apostador2 (Coroa): Perdedor`);
    // console.log("Game Greve?:");
    // console.log(`  Apostador1 (Sim): Perdedor`);
    // console.log(`  Apostador2 (Não): Ganhador`);
    // console.log("Game Brasileirão:");
    // console.log(`  Apostador1 (Vasco): Perdedor`);
    // console.log(`  Apostador2 (Qualquer Time): Ganhador`);
    
    // Verificar os saldos
    // assert(
    //   BigInt(balanceAfterBettor1) > BigInt(balanceBeforeBettor1),
    //   "Apostador1 deveria ter ganho no Game 1"
    // );
    // assert(
    //   BigInt(balanceAfterBettor2) > BigInt(balanceBeforeBettor2),
    //   "Apostador2 deveria ter ganho nos Games 2 e 3"
    // );
  });
});

  // it("Deve permitir que duas contas façam apostas em times diferentes", async () => {
  //   const betting = await MultiGameBetting.deployed();
  //   // Apostador 1 e 2 fazem apostas em cada jogo
  //   for (let i = 1; i <= 3; i++) {
  //     console.log(`\nApostando no Jogo ${i}:`);
      
  //     // Apostador 1 aposta no time 0 (Team A/C/E)
  //     await betting.placeBet(i, 0, { from: bettor1, value: web3.utils.toWei("1", "ether") });
  //     console.log(`Apostador1 apostou 1 ETH no Time 0 do Jogo ${i}`);

  //     // Apostador 2 aposta no time 1 (Team B/D/F)
  //     await betting.placeBet(i, 1, { from: bettor2, value: web3.utils.toWei("2", "ether") });
  //     console.log(`Apostador2 apostou 2 ETH no Time 1 do Jogo ${i}`);

  //     // Verificar as apostas
  //     const bet1 = await betting.getBet(i, bettor1);
  //     const bet2 = await betting.getBet(i, bettor2);

  //     assert.equal(bet1[0].toString(), web3.utils.toWei("1", "ether"), `Aposta do Bettor1 no Jogo ${i} incorreta`);
  //     assert.equal(bet2[0].toString(), web3.utils.toWei("2", "ether"), `Aposta do Bettor2 no Jogo ${i} incorreta`);

  //     console.log(`Apostas confirmadas para o Jogo ${i}: Bettor1 = ${bet1[0]} wei, Bettor2 = ${bet2[0]} wei`);
  //   }
  // });
//     // Saldo antes da aposta
//     const balanceBettor2before = await web3.eth.getBalance(bettor2);

//     // Conta 1 aposta no time 1
//     await betting.placeBet(1, 0, { from: bettor1, value: web3.utils.toWei("1", "ether") });

//     // Conta 2 aposta no time 2
//     await betting.placeBet(1, 1, { from: bettor2, value: web3.utils.toWei("2", "ether") });

//     const game = await betting.games(1);

//     // Verifica as apostas
//     const bet1 = await betting.getBet(1, bettor1);
//     const bet2 = await betting.getBet(1, bettor2);

//     // assert.equal(bet1.amount, web3.utils.toWei("1", "ether"), "Valor da aposta do bettor1 incorreto");
//     // assert.equal(bet2.amount, web3.utils.toWei("2", "ether"), "Valor da aposta do bettor2 incorreto");
// });

//   it("Deve finalizar o jogo e distribuir os prêmios", async () => {
//     const betting = await MultiGameBetting.deployed();

//     // Finaliza o jogo com o time 1 como vencedor
//     await betting.distributePrizes(1, 0, { from: owner });

//     const game = await betting.games(1);
//     assert.equal(game.isActive, false, "O jogo ainda está ativo");

//     // Verifica os saldos antes da distribuição de prêmios
//     const balanceBettor1Before = await web3.eth.getBalance(bettor1);
//     const balanceBettor2Before = await web3.eth.getBalance(bettor2);

//     // Verifica os saldos após a distribuição de prêmios
//     const balanceBettor1After = await web3.eth.getBalance(bettor1);
//     const balanceBettor2After = await web3.eth.getBalance(bettor2);

//     // O saldo de bettor2 não deve aumentar, pois ele apostou no time perdedor
//     assert(balanceBettor2After === balanceBettor2Before, "O bettor2 não deveria receber pagamento");

//     // O saldo de bettor1 deve ser maior que o de bettor2 após a distribuição de prêmios
    
//   });
// });

// const MultiGameBetting = artifacts.require("MultiGameBetting");

// contract("MultiGameBetting", (accounts) => {
//     let instance;

//     beforeEach(async () => {
//         instance = await MultiGameBetting.new();
//     });

//     it("should create a game, list active games, place bets, and distribute prizes", async () => {
//         // Create a game (only owner can do this)
//         await instance.createGame("World Cup Final", "Brazil", "France", { from: accounts[0] });

//         // Check if the game was created and is active
//         let activeGames = await instance.listActiveGames();
//         assert.equal(activeGames.length, 1, "One game should be active");

//         // Get game details to check if game name matches
//         let gameDetails = await instance.getGameDetails(1);
//         assert.equal(gameDetails.gameName, "World Cup Final", "Game name should match");

//         // Place bets from two different users on different teams
//         // User 1 bets on Team Brazil (team index 0) with 1 ETH
//         await instance.placeBet(1, 0, { from: accounts[1], value: web3.utils.toWei("1", "ether") });

//         // User 2 bets on Team France (team index 1) with 0.5 ETH
//         await instance.placeBet(1, 1, { from: accounts[2], value: web3.utils.toWei("0.5", "ether") });

//         // Confirm bets are recorded
//         let bet1 = await instance.getBet(1, accounts[1]);
//         if (bet1) { // Check if bet1 exists before accessing properties
//             assert.equal(bet1[0].toString(), web3.utils.toWei("1", "ether"), "User 1 bet amount should be correct");
//             assert.equal(bet1[1].toNumber(), 0, "User 1 should have bet on Brazil");
//         } else {
//             assert.fail("Bet 1 not found");
//         }

//         let bet2 = await instance.getBet(1, accounts[2]);
//         if (bet2) {
//             assert.equal(bet2[0].toString(), web3.utils.toWei("0.5", "ether"), "User 2 bet amount should be correct");
//             assert.equal(bet2[1].toNumber(), 1, "User 2 should have bet on France");
//         } else {
//             assert.fail("Bet 2 not found");
//         }
//         // let bet1 = await instance.getBet(1, accounts[1]);
//         // assert.equal(bet1.amount.toString(), web3.utils.toWei("1", "ether"), "User 1 bet amount should be correct");
//         // assert.equal(bet1.teamSelected.toNumber(), 0, "User 1 should have bet on Brazil");

//         // let bet2 = await instance.getBet(1, accounts[2]);
//         // assert.equal(bet2.amount.toString(), web3.utils.toWei("0.5", "ether"), "User 2 bet amount should be correct");
//         // assert.equal(bet2.teamSelected.toNumber(), 1, "User 2 should have bet on France");

//         // Distribute prizes (assume Brazil wins)
//         await instance.distributePrizes(1, 0, { from: accounts[0] }); // Brazil wins

//         // Check if the game is no longer active
//         gameDetails = await instance.getGameDetails(1);
//         assert.equal(gameDetails.isActive, false, "Game should be inactive after prize distribution");

//         // Check if User 1 (who bet on Brazil) received the prize
//         let balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for block to be mined
//         let balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        
//         // Since all bets went to Brazil, user1 gets all the pool (1.5 ETH) minus gas
//         let expectedPayout = web3.utils.toBN(web3.utils.toWei("1.5", "ether"));
//         let actualPayout = balanceAfter.sub(balanceBefore);
//         assert.isTrue(actualPayout.gt(expectedPayout.sub(web3.utils.toBN(web3.utils.toWei("0.01", "ether")))), "User 1 should have won the bet minus gas");
//     });
// });