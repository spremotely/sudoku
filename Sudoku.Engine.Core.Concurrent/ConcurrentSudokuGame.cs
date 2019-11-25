using System;
using Sudoku.Engine.Core.Contracts;
using Sudoku.Engine.Core.Contracts.Models;

namespace Sudoku.Engine.Core.Concurrent
{
    public class ConcurrentSudokuGame : AbstractSudokuGame
    {
        private readonly object _joinGameLock = new object();
        private readonly object _leaveGameLock = new object();
        private readonly object _getWinnerLock = new object();
        private readonly object _gameStatusLock = new object();
        private readonly object _newGameLock = new object();

        public ConcurrentSudokuGame(ISudokuGenerator generator, ISudokuSolver solver, ISessionMapper<Guid> sessionMapper) : base(generator, solver, sessionMapper)
        {
        }

        public override bool AddNumber(int row, int column, int value, Guid userGuid)
        {
            lock (Sudoku)
            {
                return base.AddNumber(row, column, value, userGuid);
            }
        }

        public override bool JoinGame(string session, Guid userGuid)
        {
            lock (_joinGameLock)
            {
                return base.JoinGame(session, userGuid);
            }
        }

        public override bool LeaveGame(string session)
        {
            lock (_leaveGameLock)
            {
                return base.LeaveGame(session);
            }
        }

        public override Guid? GetWinner()
        {
            lock (_getWinnerLock)
            {
                return base.GetWinner();
            }
        }

        public override SudokuGameStatus GameStatus()
        {
            lock (_gameStatusLock)
            {
                return base.GameStatus();
            }
        }

        public override void NewGame()
        {
            lock (_newGameLock)
            {
                base.NewGame();
            }
        }

        public override int[,] GetSudoku()
        {
            lock (Sudoku)
            {
                return base.GetSudoku();
            }
        }
    }
}
