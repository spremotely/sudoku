using System;
using System.Collections.Concurrent;
using System.Threading;
using Sudoku.Engine.Core.Contracts;
using Sudoku.Engine.Core.Contracts.Models;
using Sudoku.Engine.Core.Models;

namespace Sudoku.Engine.Core
{
    public class ConcurrentSudokuGame : AbstractSudokuGame
    {
        protected BlockingCollection<ISudokuNumber> ConcurrentNumbersQueue;

        public ConcurrentSudokuGame(ISudokuGenerator generator, ISudokuSolver solver) : base(generator, solver)
        {
        }

        public override void NewGame()
        {
            base.NewGame();

            ConcurrentNumbersQueue = new BlockingCollection<ISudokuNumber>();
            var queueDispatcherThread = new Thread(QueueDispatcher);
            queueDispatcherThread.Start();
        }

        public override void Join(Guid userGuid)
        {
            throw new NotImplementedException();
        }

        public override void AddNumber(int row, int column, int value, Guid userGuid)
        {
            ConcurrentNumbersQueue.TryAdd(new SudokuNumber(row, column, value, userGuid));
        }

        public override void Leave(Guid userGuid)
        {
            throw new NotImplementedException();
        }

        private void QueueDispatcher()
        {
            while(IsActive)
            {
                if (ConcurrentNumbersQueue.TryTake(out var number))
                {
                    ProcessNumber(number);
                }
            }
        }

        private void ProcessNumber(ISudokuNumber number)
        {
            if (Sudoku[number.Row, number.Column] != 0)
            {
                return;
            }

            Sudoku[number.Row, number.Column] = number.Value;

            if (!Solve())
            {
                IsActive = false;
                return;
            }

            if (!IsDone())
            {
                return;
            }

            IsActive = false;
            return;
        }
    }
}
