using System;

namespace Sudoku.Data.Contracts
{
    public interface IUser
    {
        Guid Guid { get; }
        string Name { get; }
        int Wins { get; }
    }
}
