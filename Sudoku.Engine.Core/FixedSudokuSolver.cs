using System.Linq;
using Sudoku.Engine.Core.Contracts;

namespace Sudoku.Engine.Core
{
    public class FixedSudokuSolver : ISudokuSolver
    {

        private readonly int[,] _solution = {
            { 7, 2, 3, 4, 6, 5, 8, 9, 1 },
            { 5, 6, 9, 1, 8, 3, 2, 4, 7 },
            { 8, 4, 1, 9, 7, 2, 5, 6, 3 },
            { 4, 9, 6, 3, 2, 7, 1, 5, 8 },
            { 3, 5, 2, 6, 1, 8, 4, 7, 9 },
            { 1, 8, 7, 5, 4, 9, 3, 2, 6 },
            { 2, 7, 5, 8, 9, 1, 6, 3, 4 },
            { 9, 1, 4, 2, 3, 6, 7, 8, 5 },
            { 6, 3, 8, 7, 5, 4, 9, 1, 2 }
        };

        public bool Solve(int[,] sudoku)
        {
            for (var i = 0; i < sudoku.GetLength(0); i++)
            {
                for (var j = 0; j < sudoku.GetLength(1); j++)
                {
                    if (sudoku[i, j] != 0 && sudoku[i, j] != _solution[i, j])
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
