namespace Sudoku.Engine.Core.Concurrent.Tests
{
    public class FakeFixedSudokuSolver : FixedSudokuSolver
    {
        public int[,] GetSolution()
        {
            return Solution;
        }
    }
}
