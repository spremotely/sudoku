using System;

namespace Sudoku.Engine.Core.Contracts.Models
{
    public interface ISudokuNumber
    {
        int Row { get; }
        int Column { get; }
        int Value { get; }
        Guid UserGuid { get; }
    }
}
