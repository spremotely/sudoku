using System;
using Sudoku.Engine.Core.Contracts;

namespace Sudoku.Engine.Core
{
    public class ConcurrentSudokuGame : AbstractSudokuGame
    {
        public ConcurrentSudokuGame(ISudokuGenerator generator, ISudokuSolver solver) : base(generator, solver)
        {
        }

        public override void Join(Guid userGuid)
        {
            throw new NotImplementedException();
        }

        public override void AddNumber(int row, int col, int value, Guid userGuid)
        {
            throw new NotImplementedException();
        }

        public override void Leave(Guid userGuid)
        {
            throw new NotImplementedException();
        }
    }
}
