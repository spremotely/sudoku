using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Sudoku.App.Exceptions;
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

        public void JoinGame(string username)
        {
            var user = _userRepository.GetByName(username) ?? _userRepository.Create(username);
            if (!_game.JoinGame(Context.ConnectionId, user.Guid))
            {
                Clients.Caller.SendCoreAsync("JoinGame", new object[]
                {
                    false,
                    "this user can not join game"
                });
                return;
            }

            Clients.Caller.SendCoreAsync("JoinGame", new object[]
            {
                true
            });

            this.ListGamers();
        }

        public void ListGamers()
        {
            var gamers = _userRepository.ListByGuids(_game.ListGamers());
            Clients.All.SendCoreAsync("ListGamers", new object[]
            {
                gamers.Select(u => u.Name)
            });
        }

        public void LeaveGame()
        {
            if (!_game.LeaveGame(Context.ConnectionId))
            {
                var exception = new SudokuHubException("user can not leave game");
                exception.Data["connection id"] = Context.ConnectionId;
                throw exception;
            }

            ListGamers();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            LeaveGame();

            return base.OnDisconnectedAsync(exception);
        }
    }
}
