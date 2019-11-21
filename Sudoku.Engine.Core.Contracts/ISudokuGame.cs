using System;

namespace Sudoku.Engine.Core.Contracts
{
    public interface ISudokuGame
    {
        int[,] Sudoku { get; }
        bool IsActive { get; }

        void NewGame();
        bool Solve();
        void Join(Guid userGuid);
        void AddNumber(int row, int col, int value, Guid userGuid);
        void Leave(Guid userGuid);
    }
}
