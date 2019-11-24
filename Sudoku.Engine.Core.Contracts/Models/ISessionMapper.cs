using System.Collections;
using System.Collections.Generic;

namespace Sudoku.Engine.Core.Contracts.Models
{
    public interface ISessionMapper<T>
    {
        bool Add(string session, T value);
        T Get(string session);
        bool Remove(string session);
        bool Contains(T value);
        IList<T> List();
    }
}
