using System;
using Sudoku.Engine.Core.Contracts.Models;

namespace Sudoku.Engine.Core.Models
{
    public class SudokuNumber : ISudokuNumber
    {
        public int Row { get; set; }
        public int Column { get; set; }
        public int Value { get; set; }
        public Guid UserGuid { get; set; }

        public SudokuNumber(int row, int column, int value, Guid userGuid)
        {
            Row = row;
            Column = column;
            Value = value;
            UserGuid = userGuid;
        }
    }
}
