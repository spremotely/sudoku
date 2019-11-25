using System;
using System.Collections;
using System.Collections.Generic;

namespace Sudoku.Data.Contracts
{
    public interface IUserRepository
    {
        IUser GetByName(string name);
        IUser GetByGuid(Guid guid);
        IUser Create(string name);
        IUser UpdateWins(Guid guid, int wins);
        IList<IUser> Top(int limit = 10);
        IList<IUser> ListByGuids(IList<Guid> guids);
    }
}
