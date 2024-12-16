// const MultiGameBetting = artifacts.require("MultiGameBetting");

// contract("MultiGameBetting", (accounts) => {
//   const owner = accounts[0];
//   const bettor1 = accounts[1];
//   const bettor2 = accounts[2];
//   const gameName = "Team A vs Team B";
//   const team1 = "Team A";
//   const team2 = "Team B";

//   it("Deve criar um jogo com sucesso", async () => {
//     const betting = await MultiGameBetting.deployed();
//     await betting.createGame(gameName, team1, team2, { from: owner });

//     const game = await betting.games(1);
//     assert.equal(game.gameName, gameName, "O nome do jogo está incorreto");
//     assert.equal(game.isActive, true, "O jogo não está ativo");
//   });

//   it("Deve permitir que duas contas façam apostas em times diferentes", async () => {
//     const betting = await MultiGameBetting.deployed();

//     // Conta 1 aposta no time 1
//     await betting.placeBet(1, 0, { from: bettor1, value: web3.utils.toWei("1", "ether") });

//     // Conta 2 aposta no time 2
//     await betting.placeBet(1, 1, { from: bettor2, value: web3.utils.toWei("2", "ether") });

//     const game = await betting.games(1);

//     // Verifica as apostas
//     // const bet1 = await betting.games(1).bets(bettor1);
//     // const bet2 = await betting.games(1).bets(bettor2);
//     const bet1 = await betting.getBet(1, bettor1);
//     const bet2 = await betting.getBet(1, bettor2);

//     assert.equal(bet1.amount, web3.utils.toWei("1", "ether"), "Valor da aposta do bettor1 incorreto");
//     assert.equal(bet2.amount, web3.utils.toWei("2", "ether"), "Valor da aposta do bettor2 incorreto");
//   });

//   it("Deve finalizar o jogo e distribuir os prêmios", async () => {
//     const betting = await MultiGameBetting.deployed();

//     // Finaliza o jogo com o time 1 como vencedor
//     await betting.distributePrizes(1, 0, { from: owner });

//     const game = await betting.games(1);
//     assert.equal(game.isActive, false, "O jogo ainda está ativo");

//     // Verifica os saldos após a distribuição
//     const balanceBettor1 = await web3.eth.getBalance(bettor1);
//     const balanceBettor2 = await web3.eth.getBalance(bettor2);

//     // O prêmio é calculado com base no valor total apostado no time vencedor
//     const expectedPayoutBettor1 = (web3.utils.toWei("1", "ether") * web3.utils.toWei("3", "ether")) / web3.utils.toWei("1", "ether");

//     assert(balanceBettor1 >= expectedPayoutBettor1, "O pagamento ao bettor1 está incorreto");
//     assert(balanceBettor2 < web3.utils.toWei("2", "ether"), "O bettor2 não deveria receber pagamento");
//   });
// });


const MultiGameBetting = artifacts.require("MultiGameBetting");

contract("MultiGameBetting", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await MultiGameBetting.new();
  });

  it("should create a game, list active games, place bets, and distribute prizes", async () => {
    // Create a game (only owner can do this)
    await instance.createGame("World Cup Final", "Brazil", "France", { from: accounts[0] });

    // Check if the game was created and is active
    let activeGames = await instance.listActiveGames();
    assert.equal(activeGames.length, 1, "One game should be active");

    // Get game details to check if game name matches
    let gameDetails = await instance.getGameDetails(1);
    assert.equal(gameDetails.gameName, "World Cup Final", "Game name should match");

      // Place bets from two different users on different teams
      // User 1 bets on Team Brazil (team index 0) with 1 ETH
      await instance.placeBet(1, 0, { from: accounts[1], value: web3.utils.toWei("1", "ether") });

      // User 2 bets on Team France (team index 1) with 0.5 ETH
      await instance.placeBet(1, 1, { from: accounts[2], value: web3.utils.toWei("0.5", "ether") });

      // Confirm bets are recorded
      let bet1 = await instance.getBet(1, accounts[1]);
      assert.equal(bet1.amount.toString(), web3.utils.toWei("1", "ether"), "User 1 bet amount should be correct");
      assert.equal(bet1.teamSelected, 0, "User 1 should have bet on Brazil");

      let bet2 = await instance.getBet(1, accounts[2]);
      assert.equal(bet2.amount.toString(), web3.utils.toWei("0.5", "ether"), "User 2 bet amount should be correct");
      assert.equal(bet2.teamSelected, 1, "User 2 should have bet on France");

      // Distribute prizes (assume Brazil wins)
      await instance.distributePrizes(1, 0, { from: accounts[0] }); // Brazil wins

      // Check if the game is no longer active
      gameDetails = await instance.getGameDetails(1);
      assert.equal(gameDetails.isActive, false, "Game should be inactive after prize distribution");

      // Check if User 1 (who bet on Brazil) received the prize
      let balanceBefore = await web3.eth.getBalance(accounts[1]);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for block to be mined
      let balanceAfter = await web3.eth.getBalance(accounts[1]);
      
      // Since all bets went to Brazil, user1 gets all the pool (1.5 ETH) minus gas
      assert.isAbove(balanceAfter - balanceBefore, web3.utils.toWei("1.49", "ether"), "User 1 should have won the bet");
  });
});