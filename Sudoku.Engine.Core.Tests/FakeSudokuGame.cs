using System;
using Sudoku.Engine.Core.Contracts;

namespace Sudoku.Engine.Core.Tests
{
    public class FakeSudokuGame : AbstractSudokuGame
    {
        public FakeSudokuGame(ISudokuGenerator generator, ISudokuSolver solver) : base(generator, solver)
        {
        }

        public override void Join(Guid userGuid)
        {
            throw new NotImplementedException();
        }

        public override void Leave(Guid userGuid)
        {
            throw new NotImplementedException();
        }
    }
}
