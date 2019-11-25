using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Sudoku.App.Exceptions;
using Sudoku.App.Models;
using Sudoku.Data.Contracts;
using Sudoku.Engine.Core.Contracts;
using Sudoku.Engine.Core.Contracts.Models;

namespace Sudoku.App.Hubs
{
    public class SudokuHub : Hub
    {
        private readonly ISudokuGame _game;
        private readonly IUserRepository _userRepository;

        public SudokuHub(ISudokuGame game, IUserRepository userRepository)
        {
            _game = game;
            _userRepository = userRepository;
        }

        public async Task JoinGame(string userName)
        {
            var user = _userRepository.GetByName(userName) ?? _userRepository.Create(userName);
            if (!_game.JoinGame(Context.ConnectionId, user.Guid))
            {
                await Clients.Caller.SendCoreAsync("JoinGame", new object[]
                {
                    null
                });

                return;
            }

            await Clients.Caller.SendCoreAsync("JoinGame", new object[]
            {
                user
            });
        }

        public void NewGame()
        {
            _game.NewGame();
        }

        public async Task AddNumber(int row, int column, int value)
        {
            if (!_game.AddNumber(row, column, value, _game.GetGamer(Context.ConnectionId)))
            {
                return;
            }

            await Clients.All.SendCoreAsync("AddNumber", new object[]
            {
                new SudokuNumber
                {
                    Row = row,
                    Column = column,
                    Value = value
                }
            });

            if (_game.GameStatus() == SudokuGameStatus.Solved)
            {
                var winnerGuid = _game.GetWinner();

                if (winnerGuid == null)
                {
                    var exception = new SudokuHubException("winner not found in game");
                    exception.Data["connection id"] = Context.ConnectionId;
                    throw exception;
                }

                var winner = _userRepository.GetByGuid(winnerGuid.Value);

                if (winner == null)
                {
                    var exception = new SudokuHubException("winner not found in repository");
                    exception.Data["connection id"] = Context.ConnectionId;
                    throw exception;
                }

                _userRepository.UpdateWins(winner.Guid, winner.Wins + 1);

                await UpdateTop();
            }
        }

        public async Task GameStatus()
        {
            await Clients.All.SendCoreAsync("GameStatus", new object[]
            {
                _game.GameStatus().ToString()
            });
        }

        public async Task GetSudoku()
        {
            await Clients.All.SendCoreAsync("GetSudoku", new object[]
            {
                _game.GetSudoku()
            });
        }

        public async Task GetWinner()
        {
            var winnerGuid = _game.GetWinner();

            if (winnerGuid == null)
            {
                return;
            }

            var user = _userRepository.GetByGuid(winnerGuid.Value);

            if (user == null)
            {
                return;
            }

            await Clients.All.SendCoreAsync("GetWinner", new object[]
            {
                user
            });
        }

        public async Task ListGamers()
        {
            var gamers = _userRepository.ListByGuids(_game.ListGamers());
            await Clients.All.SendCoreAsync("ListGamers", new object[]
            {
                gamers.Select(u => u.Name)
            });
        }

        public async Task LeaveGame()
        {
            if (!_game.LeaveGame(Context.ConnectionId))
            {
                var exception = new SudokuHubException("user can not leave game");
                exception.Data["connection id"] = Context.ConnectionId;
                throw exception;
            }

            await ListGamers();
        }

        public async Task GetTop()
        {
            await Clients.Caller.SendCoreAsync("GetTop", new object[]
            {
                _userRepository.Top()
            });
        }

        public async Task UpdateTop()
        {
            await Clients.All.SendCoreAsync("UpdateTop", new object[]
            {
                _userRepository.Top()
            });
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await LeaveGame();
            await base.OnDisconnectedAsync(exception);
        }
    }
}
