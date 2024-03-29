﻿using Sudoku.Engine.Core.Contracts;

namespace Sudoku.Engine.Core
{
    public class FixedSudokuGenerator : ISudokuGenerator
    {
        public int[,] Generate()
        {
            return new[,]
            {
                { 7, 0, 0, 0, 6, 5, 0, 0, 1 },
                { 5, 0, 9, 0, 8, 0, 0, 0, 0 },
                { 8, 0, 1, 0, 0, 0, 0, 6, 0 },
                { 0, 9, 6, 0, 2, 0, 0, 0, 8 },
                { 0, 5, 2, 6, 0, 8, 4, 7, 0 },
                { 0, 0, 7, 5, 0, 0, 0, 0, 6 },
                { 2, 0, 5, 0, 0, 1, 0, 3, 0 },
                { 9, 0, 4, 2, 3, 0, 7, 0, 0 },
                { 6, 3, 8, 7, 5, 4, 0, 1, 2 }
            };
        }
    }
}
