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
            _sudokuGame.AddNumber(TODO);
            Assert.True(_sudokuGame.Solve());
        }

        [Fact]
        public void TestSolve_WrongSolution()
        {
            _sudokuGame.NewGame();
            _sudokuGame.AddNumber(TODO);
            Assert.False(_sudokuGame.Solve());
        }
    }
}
