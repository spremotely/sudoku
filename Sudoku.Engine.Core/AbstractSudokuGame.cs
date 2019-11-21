using System;
using System.Linq;
using Newtonsoft.Json;
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


        public int[,] Sudoku { get; protected set; }
        public bool IsActive { get; protected set; }

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
            return Solver.Solve(Sudoku);
        }

        public virtual void AddNumber(int row, int col, int value, Guid userGuid)
        {
            if (!IsActive)
            {
                var exception = new AbstractSudokuGameException("game is not active");
                throw exception;
            }

            if (value < 1 || value > Sudoku.GetLength(0))
            {
                var exception = new AbstractSudokuGameException("incorrect value");
                exception.Data["sudoku size"] = Sudoku.GetLength(0);
                exception.Data["value"] = value;
                throw exception;
            }

            Sudoku[row, col] = value;
        }

        public abstract void Join(Guid userGuid);

        public abstract void Leave(Guid userGuid);
    }
}
