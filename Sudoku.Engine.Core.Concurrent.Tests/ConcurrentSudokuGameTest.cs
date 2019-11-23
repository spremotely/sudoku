using System;
using System.Threading;
using Sudoku.Engine.Core.Models;
using Xunit;

namespace Sudoku.Engine.Core.Concurrent.Tests
{
    public class ConcurrentSudokuGameTest
    {
        [Fact]
        public void TestMultipleUsersNewGame()
        {
            var onNewGameTimes = 0;
            var game = new ConcurrentSudokuGame(new FixedSudokuGenerator(), new FixedSudokuSolver());

            game.OnNewGame += (sender, args) =>
            {
                onNewGameTimes++;
            };

            var thread1 = new Thread(() =>
            {
                game.NewGame();
            });

            var thread2 = new Thread(() =>
            {
                game.NewGame();
            });

            var thread3 = new Thread(() =>
            {
                game.NewGame();
            });

            thread1.Start();
            thread2.Start();
            thread3.Start();

            Thread.Sleep(1000);
            Assert.Equal(1, onNewGameTimes);
        }

        [Fact]
        public void TestMultipleUsersGameOver()
        {
            var isGameOver = false;
            var game = new ConcurrentSudokuGame(new FixedSudokuGenerator(), new FixedSudokuSolver());

            game.NewGame();

            game.OnGameOver += sender =>
            {
                isGameOver = true;
            };

            var thread1 = new Thread(() =>
            {
                game.AddNumber(new SudokuNumber(0, 1,8, new Guid()));
                game.AddNumber(new SudokuNumber(0, 2, 9, new Guid()));
            });

            var thread2 = new Thread(() =>
            {
                Thread.Sleep(10);
                game.AddNumber(new SudokuNumber(0, 1, 2, new Guid()));
            });

            thread1.Start();
            thread2.Start();

            Thread.Sleep(100);
            Assert.True(isGameOver);
        }

        [Fact]
        public void TestMultipleUsersSolvedGameCorrectWinner()
        {
            var winnerGuid = new Guid();
            var user1Guid = Guid.NewGuid();
            var user2Guid = Guid.NewGuid();

            var solver = new FakeFixedSudokuSolver();

            var game = new ConcurrentSudokuGame(new FixedSudokuGenerator(), solver);
            game.NewGame();

            game.OnGameOver += sender =>
            {
                Assert.True(false);
            };

            game.OnSolvedGame += (sender, args) =>
            {
                winnerGuid = args.WinnerUserGuid;
            };

            var thread1 = new Thread(() =>
            {
                var solution = solver.GetSolution();
                for (var i = 0; i < solution.GetLength(0); i++)
                {
                    for (var j = 0; j < solution.GetLength(1); j++)
                    {
                        Thread.Sleep(5);
                        game.AddNumber(new SudokuNumber(i, j, solution[i, j], user1Guid));
                    }
                }
            });

            var thread2 = new Thread(() =>
            {
                var solution = solver.GetSolution();
                for (var i = 0; i < solution.GetLength(0); i++)
                {
                    for (var j = 0; j < solution.GetLength(1); j++)
                    {
                        Thread.Sleep(10);
                        game.AddNumber(new SudokuNumber(i, j, solution[i, j], user2Guid));
                    }
                }
            });

            thread1.Start();
            thread2.Start();

            Thread.Sleep(1000);
            Assert.Equal(user1Guid, winnerGuid);
        }
    }
}
