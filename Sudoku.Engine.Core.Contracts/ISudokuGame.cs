using System;
using Sudoku.Engine.Core.Contracts.Models;

namespace Sudoku.Engine.Core.Contracts
{
    public interface ISudokuGame
    {
        void NewGame();
        bool Solve();
        void Join(Guid userGuid);
        void AddNumber(ISudokuNumber number);
        void Leave(Guid userGuid);
    }
}
