using System;

namespace Sudoku.Data.Contracts.Models
{
    public interface IRating
    {
        int Id { get; }
        Guid UserGuid { get; }
        int Wins { get; }
        int Defeats { get; }
    }
}
