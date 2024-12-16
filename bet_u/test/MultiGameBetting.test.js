const MultiGameBetting = artifacts.require("MultiGameBetting");

contract("MultiGameBetting", (accounts) => {
  const owner = accounts[0];
  const bettor1 = accounts[1];
  const bettor2 = accounts[2];
  const gameName = "Team A vs Team B";
  const team1 = "Team A";
  const team2 = "Team B";

  it("Deve criar um jogo com sucesso", async () => {
    const betting = await MultiGameBetting.deployed();
    await betting.createGame(gameName, team1, team2, { from: owner });

    const game = await betting.games(1);
    assert.equal(game.gameName, gameName, "O nome do jogo está incorreto");
    assert.equal(game.isActive, true, "O jogo não está ativo");
  });

  it("Deve permitir que duas contas façam apostas em times diferentes", async () => {
    const betting = await MultiGameBetting.deployed();

    // Conta 1 aposta no time 1
    await betting.placeBet(1, 0, { from: bettor1, value: web3.utils.toWei("1", "ether") });

    // Conta 2 aposta no time 2
    await betting.placeBet(1, 1, { from: bettor2, value: web3.utils.toWei("2", "ether") });

    const game = await betting.games(1);

    // Verifica as apostas
    // const bet1 = await betting.games(1).bets(bettor1);
    // const bet2 = await betting.games(1).bets(bettor2);
    const bet1 = await betting.getBet(1, bettor1);
    const bet2 = await betting.getBet(1, bettor2);

    assert.equal(bet1.amount, web3.utils.toWei("1", "ether"), "Valor da aposta do bettor1 incorreto");
    assert.equal(bet2.amount, web3.utils.toWei("2", "ether"), "Valor da aposta do bettor2 incorreto");
  });

  it("Deve finalizar o jogo e distribuir os prêmios", async () => {
    const betting = await MultiGameBetting.deployed();

    // Finaliza o jogo com o time 1 como vencedor
    await betting.distributePrizes(1, 0, { from: owner });

    const game = await betting.games(1);
    assert.equal(game.isActive, false, "O jogo ainda está ativo");

    // Verifica os saldos após a distribuição
    const balanceBettor1 = await web3.eth.getBalance(bettor1);
    const balanceBettor2 = await web3.eth.getBalance(bettor2);

    // O prêmio é calculado com base no valor total apostado no time vencedor
    const expectedPayoutBettor1 = (web3.utils.toWei("1", "ether") * web3.utils.toWei("3", "ether")) / web3.utils.toWei("1", "ether");

    assert(balanceBettor1 >= expectedPayoutBettor1, "O pagamento ao bettor1 está incorreto");
    assert(balanceBettor2 < web3.utils.toWei("2", "ether"), "O bettor2 não deveria receber pagamento");
  });
});
