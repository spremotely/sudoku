using System;
using System.Collections.Generic;
using System.Linq;
using Sudoku.Engine.Core.Contracts;
using Sudoku.Engine.Core.Contracts.Models;
using Sudoku.Engine.Core.Exceptions;

namespace Sudoku.Engine.Core
{
    public abstract class AbstractSudokuGame : ISudokuGame
    {
        protected readonly ISudokuGenerator Generator;
        protected readonly ISudokuSolver Solver;
        protected readonly ISessionMapper<Guid> SessionMapper;
        protected SudokuGameStatus Status = SudokuGameStatus.NotActive;
        protected Guid? Winner = null;

        protected virtual int[,] Sudoku { get; set; }

        protected AbstractSudokuGame(ISudokuGenerator generator, ISudokuSolver solver, ISessionMapper<Guid> sessionMapper)
        {
            Generator = generator;
            Solver = solver;
            this.SessionMapper = sessionMapper;
        }

        public virtual void NewGame()
        {
            Sudoku = Generator.Generate();

            if (Sudoku.GetLength(0) == Sudoku.GetLength(1))
            {
                Status = SudokuGameStatus.InProgress;
                return;
            }

            Status = SudokuGameStatus.NotActive;

            var exception = new AbstractSudokuGameException("incorrect sudoku size");
            exception.Data["rows"] = Sudoku.GetLength(0);
            exception.Data["columns"] = Sudoku.GetLength(1);
            throw exception;
        }

        public virtual bool JoinGame(string session, Guid userGuid)
        {
            if (SessionMapper.Contains(userGuid))
            {
                return false;
            }

            if (!SessionMapper.Add(session, userGuid))
            {
                var exception = new AbstractSudokuGameException("cannot connect user");
                exception.Data["session"] = session;
                exception.Data["user guid"] = userGuid;
                throw exception;
            }

            if (Status != SudokuGameStatus.InProgress)
            {
                NewGame();
            }

            return true;
        }

        public virtual bool LeaveGame(string session)
        {
            return SessionMapper.Remove(session);
        }

        public virtual IList<Guid> ListGamers()
        {
            return SessionMapper.List();
        }

        public virtual SudokuGameStatus GameStatus()
        {
            return Status;
        }

        public virtual int[,] GetSudoku()
        {
            return Sudoku;
        }

        public virtual Guid? GetWinner()
        {
            return Winner;
        }

        public virtual bool AddNumber(int row, int column, int value, Guid userGuid)
        {
            if (Status != SudokuGameStatus.InProgress)
            {
                throw new AbstractSudokuGameException("sudoku is not in progress");
            }

            if (value < 1 || value > Sudoku.GetLength(0))
            {
                var exception = new AbstractSudokuGameException("incorrect value");
                exception.Data["sudoku size"] = Sudoku.GetLength(0);
                exception.Data["value"] = value;
                throw exception;
            }

            if (Sudoku[row, column] != 0)
            {
                return false;
            }

            Sudoku[row, column] = value;

            if (!Solve())
            {
                Status = SudokuGameStatus.GameOver;
                return true;
            }

            if (!IsDone())
            {
                return true;
            }

            Status = SudokuGameStatus.Solved;
            Winner = userGuid;
            return true;
        }

        protected bool IsDone()
        {
            return Sudoku.Cast<int>().All(value => value != 0);
        }

        protected bool Solve()
        {
            if (Status != SudokuGameStatus.InProgress)
            {
                throw new AbstractSudokuGameException("sudoku is not in progress");
            }

            return Solver.Solve(Sudoku);
        }
    }
}
