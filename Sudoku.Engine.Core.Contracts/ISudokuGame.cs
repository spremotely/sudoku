using System;
using Sudoku.Engine.Core.Contracts.Models;

namespace Sudoku.Engine.Core.Contracts
{
    public interface ISudokuGame
    {
        void NewGame();
        bool Solve();
        void AddNumber(ISudokuNumber number);
    }
}
