﻿using System;
using System.Collections.Concurrent;
using System.Threading;
using Sudoku.Engine.Core.Concurrent.Events;
using Sudoku.Engine.Core.Contracts;
using Sudoku.Engine.Core.Contracts.Models;

namespace Sudoku.Engine.Core.Concurrent
{
    public class ConcurrentSudokuGame : AbstractSudokuGame
    {
        private readonly object _newGameLock = new object();
        private  Thread _queueDispatcherThread;

        protected BlockingCollection<ISudokuNumber> ConcurrentNumbersQueue;

        public delegate void NewGameHandler(object sender, NewGameEventArgs e);
        public event NewGameHandler OnNewGame;

        public delegate void SolvedGameHandler(object sender, SolvedGameEventArgs e);
        public event SolvedGameHandler OnSolvedGame;

        public delegate void GameOverHandler(object sender);
        public event GameOverHandler OnGameOver;

        public delegate void AddNumberHandler(object sender, AddNumberEventArgs e);
        public event AddNumberHandler OnAddNumber;

        public ConcurrentSudokuGame(ISudokuGenerator generator, ISudokuSolver solver) : base(generator, solver)
        {
        }

        public override void NewGame()
        {
            lock (_newGameLock)
            {
                if (IsActive)
                {
                    return;
                }

                base.NewGame();

                ConcurrentNumbersQueue = new BlockingCollection<ISudokuNumber>();
                _queueDispatcherThread = new Thread(QueueDispatcher);
                _queueDispatcherThread.Start();

                OnNewGame?.Invoke(this, new NewGameEventArgs(Sudoku));
            }
        }

        public override void AddNumber(ISudokuNumber number)
        {
            ConcurrentNumbersQueue.TryAdd(number);
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
            OnAddNumber?.Invoke(this, new AddNumberEventArgs(number));

            if (!Solve())
            {
                IsActive = false;
                OnGameOver?.Invoke(this);
                return;
            }

            if (!IsDone())
            {
                return;
            }

            IsActive = false;
            OnSolvedGame?.Invoke(this, new SolvedGameEventArgs(number.UserGuid));
        }
    }
}