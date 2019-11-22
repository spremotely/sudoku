using System;
using System.Linq;
using Sudoku.Engine.Core.Contracts;
using Sudoku.Engine.Core.Exceptions;

namespace Sudoku.Engine.Core
{
    public abstract class AbstractSudokuGame : ISudokuGame
    {
        protected ISudokuGenerator Generator;
        protected ISudokuSolver Solver;

        protected AbstractSudokuGame(ISudokuGenerator generator, ISudokuSolver solver)
        {
            Generator = generator;
            Solver = solver;
        }

        protected virtual int[,] Sudoku { get; set; }
        protected bool IsActive { get; set; }

        public virtual void NewGame()
        {
            Sudoku = Generator.Generate();

            if (Sudoku.GetLength(0) == Sudoku.GetLength(1))
            {
                IsActive = true;
                return;
            }

            IsActive = false;

            var exception = new AbstractSudokuGameException("incorrect sudoku size");
            exception.Data["rows"] = Sudoku.GetLength(0);
            exception.Data["columns"] = Sudoku.GetLength(1);
            throw exception;
        }

        public virtual bool Solve()
        {
            if (!IsActive)
            {
                throw new AbstractSudokuGameException("sudoku is not active");
            }

            return Solver.Solve(Sudoku);
        }

        public virtual void AddNumber(int row, int column, int value, Guid userGuid)
        {
            if (!IsActive)
            {
                throw new AbstractSudokuGameException("sudoku is not active");
            }

            if (value < 1 || value > Sudoku.GetLength(0))
            {
                var exception = new AbstractSudokuGameException("incorrect value");
                exception.Data["sudoku size"] = Sudoku.GetLength(0);
                exception.Data["value"] = value;
                throw exception;
            }

            Sudoku[row, column] = value;
        }

        public virtual void Join(Guid userGuid)
        {
            if (!IsActive)
            {
                throw new AbstractSudokuGameException("sudoku is not active");
            }
        }

        public virtual void Leave(Guid userGuid)
        {
            if (!IsActive)
            {
                throw new AbstractSudokuGameException("sudoku is not active");
            }
        }

        protected bool IsDone()
        {
            return Sudoku.Cast<int>().All(value => value != 0);
        }
    }
}
