using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Sudoku.App.Exceptions;
using Sudoku.App.Models;
using Sudoku.Data.Contracts;
using Sudoku.Engine.Core.Contracts;

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

        public async Task JoinGame(string username)
        {
            var user = _userRepository.GetByName(username) ?? _userRepository.Create(username);
            if (!_game.JoinGame(Context.ConnectionId, user.Guid))
            {
                await Clients.Caller.SendCoreAsync("JoinGame", new object[]
                {
                    new JoinStatus
                    {
                        IsSuccess = false,
                        ErrorMessage = "this user can't join to game"
                    }
                });
                return;
            }

            await Clients.Caller.SendCoreAsync("JoinGame", new object[]
            {
                new JoinStatus
                {
                    IsSuccess = true
                }
            });

            await ListGamers();
            await GetSudoku();
        }

        public async Task AddNumber(int row, int column, int value)
        {
            if (_game.AddNumber(row, column, value, _game.GetGamer(Context.ConnectionId)))
            {
                await Clients.All.SendCoreAsync("AddNumber", new object[]
                {
                    new SudokuNumber
                    {
                        Row = row,
                        Column = column,
                        Value = value
                    }
                });
            }
        }

        public async Task GameStatus()
        {
            await Clients.All.SendCoreAsync("GameStatus", new object[]
            {
                _game.GameStatus()
            });
        }

        public async Task GetSudoku()
        {
            await Clients.Caller.SendCoreAsync("GetSudoku", new object[]
            {
                _game.GetSudoku()
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

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await LeaveGame();
            await base.OnDisconnectedAsync(exception);
        }
    }
}
