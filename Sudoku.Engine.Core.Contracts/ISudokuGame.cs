using System;

namespace Sudoku.Engine.Core.Contracts
{
    public interface ISudokuGame
    {
        void NewGame();
        bool Solve();
        void Join(Guid userGuid);
        void AddNumber(int row, int column, int value, Guid userGuid);
        void Leave(Guid userGuid);
    }
}
