namespace Sudoku.Engine.Core.Contracts
{
    public interface ISudokuSolver
    {
        bool Solve(int[,] sudoku);
    }
}
