using System;
using System.Collections.Generic;
using Sudoku.Engine.Core.Contracts.Models;

namespace Sudoku.Engine.Core.Contracts
{
    public interface ISudokuGame
    {
        void NewGame();
        bool JoinGame(string session, Guid userGuid);
        bool LeaveGame(string session);
        bool AddNumber(int row, int column, int value, Guid userGuid);
        IList<Guid> ListGamers();
        SudokuGameStatus GameStatus();
        int[,] GetSudoku();
        Guid? GetWinner();
    }
}
