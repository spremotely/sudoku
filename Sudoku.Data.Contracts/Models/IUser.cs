using System;

namespace Sudoku.Data.Contracts.Models
{
    public interface IUser
    {
        Guid Guid { get; }
        string Name { get; }
        IRating Rating { get; }
    }
}
