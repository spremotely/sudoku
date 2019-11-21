using System;
using Sudoku.Engine.Core.Contracts;
using Xunit;

namespace Sudoku.Engine.Core.Tests
{
    public class FixedSudokuTest
    {
        private readonly ISudokuGame _sudokuGame;
        private readonly ISudokuGenerator _sudokuGenerator = new FixedSudokuGenerator();
        private readonly ISudokuSolver _sudokuSolver = new FixedSudokuSolver();

        public FixedSudokuTest()
        {
            this._sudokuGame = new FakeSudokuGame(_sudokuGenerator, _sudokuSolver);
        }

        [Fact]
        public void TestSolve_RightSolution()
        {
            _sudokuGame.NewGame();
            _sudokuGame.AddNumber(0, 1, 2, Guid.NewGuid());
            Assert.True(_sudokuGame.Solve());
        }
    }
}
