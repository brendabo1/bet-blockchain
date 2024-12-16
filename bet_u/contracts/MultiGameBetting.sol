// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;


contract MultiGameBetting {
    address public owner;
    uint256 public gameCounter;

    struct Team {
        string name;
        uint256 totalBetAmount;
        uint256 odds;
    }

    struct Bet {
        address bettor;
        uint256 amount;
        uint16 teamSelected;
    }

    struct Game {
        string gameName;
        uint256 totalBets;
        Team[2] teams;
        mapping(address => Bet) bets;
        address[] bettors;
        bool isActive;
    }

    mapping(uint256 => Game) public games;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    event GameCreated(uint256 gameId, string gameName, string team1, string team2);
    event BetPlaced(uint256 gameId, address bettor, uint256 amount, uint16 teamSelected, uint256 newOdds);
    event PrizesDistributed(uint256 gameId, uint16 winningTeam);

    constructor() {
        owner = msg.sender;
        gameCounter = 0;
    }

    function createGame(string memory _gameName, string memory _team1, string memory _team2) public onlyOwner {
        gameCounter++;
        Game storage newGame = games[gameCounter];
        newGame.gameName = _gameName;
        newGame.teams[0] = Team(_team1, 0, 2 * 1e18); // Initial odds 2.00
        newGame.teams[1] = Team(_team2, 0, 2 * 1e18); // Initial odds 2.00
        newGame.isActive = true;

        emit GameCreated(gameCounter, _gameName, _team1, _team2);
    }

    function calculateOdds(uint256 totalBets, uint256 teamBets) internal pure returns (uint256) {
        if (teamBets == 0) {
            return 2 * 1e18; // Default odd for no bets
        }
        return (totalBets * 1e18) / teamBets;
    }

    function placeBet(uint256 _gameId, uint16 _teamSelected) public payable {
        require(_gameId > 0 && _gameId <= gameCounter, "Invalid game ID");
        Game storage game = games[_gameId];
        require(game.isActive, "Game is not active");
        require(msg.value >= 0.01 ether, "Minimum bet is 0.01 ETH");
        require(_teamSelected == 0 || _teamSelected == 1, "Invalid team selection");
        require(game.bets[msg.sender].amount == 0, "You have already placed a bet");

        // Register the bet
        game.bets[msg.sender] = Bet(msg.sender, msg.value, _teamSelected);
        game.bettors.push(msg.sender);
        game.totalBets += msg.value;
        game.teams[_teamSelected].totalBetAmount += msg.value;

        // Recalculate odds
    //     game.teams[0].odds = calculateOdds(game.totalBets, game.teams[0].totalBetAmount);
    //     game.teams[1].odds = calculateOdds(game.totalBets, game.teams[1].totalBetAmount);

    //     emit BetPlaced(_gameId, msg.sender, msg.value, _teamSelected, game.teams[_teamSelected].odds);
    // }
        
        // Recalculate odds for both teams
        uint256 newOddsTeam1 = calculateOdds(game.teams[0].totalBetAmount, game.totalBets);
        uint256 newOddsTeam2 = calculateOdds(game.teams[1].totalBetAmount, game.totalBets);

        // Update odds in the game structure
        game.teams[0].odds = newOddsTeam1;
        game.teams[1].odds = newOddsTeam2;

        emit BetPlaced(_gameId, msg.sender, msg.value, _teamSelected, newOddsTeam1, newOddsTeam2);
    }

     function distributePrizes(uint256 _gameId, uint16 _winningTeam) public onlyOwner {
        require(_gameId > 0 && _gameId <= gameCounter, "Invalid game ID");
        Game storage game = games[_gameId];
        require(game.isActive, "Game is not active");
        require(_winningTeam == 0 || _winningTeam == 1, "Invalid winning team");

        uint256 totalWinningBets = game.teams[_winningTeam].totalBetAmount;
        uint256 totalPrizePool = game.totalBets;
        if (totalWinningBets > 0) {
            for (uint256 i = 0; i < game.bettors.length; i++) {
                address bettor = game.bettors[i];
                Bet memory bet = game.bets[bettor];

                if (bet.teamSelected == _winningTeam) {
                    uint256 payout = (bet.amount * totalPrizePool) / totalWinningBets;
                    //payable(bettor).transfer(payout);
                    (bool success, ) = bettor.call{value: payout}("");
                    require(success, "Transfer failed.");
                }
            }
        }else{
            // No one bet on the winning team, return all funds to owner
            (bool success, ) = owner.call{value: totalPrizePool}("");
            require(success, "Transfer to owner failed.");
        }

        game.isActive = false;
        emit PrizesDistributed(_gameId, _winningTeam);
    }

    function listActiveGames() public view returns (uint256[] memory) {
        uint256[] memory activeGames = new uint256[](gameCounter);
        uint256 count = 0;

        for (uint256 i = 1; i <= gameCounter; i++) {
            if (games[i].isActive) {
                activeGames[count] = i;
                count++;
            }
        }

        return activeGames;
    }

    function getBet(uint256 _gameId, address _bettor) public view returns (uint256, uint16) {
        Bet storage bet = games[_gameId].bets[_bettor];
        return (bet.amount, bet.teamSelected);
    }


    function getGameDetails(uint256 _gameId) public view returns (
        string memory gameName,
        uint256 totalBets,
        string memory team1Name,
        uint256 team1Bets,
        uint256 team1Odds,
        string memory team2Name,
        uint256 team2Bets,
        uint256 team2Odds,
        bool isActive
        ) {
        Game storage game = games[_gameId];
        return (
            game.gameName,
            game.totalBets,
            game.teams[0].name,
            game.teams[0].totalBetAmount,
            game.teams[0].odds,
            game.teams[1].name,
            game.teams[1].totalBetAmount,
            game.teams[1].odds,
            game.isActive
        );
    }

}
