using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sudoku.Data.Contracts.Models;

namespace Sudoku.Data.Contracts.Repositories
{
    public interface IRatingRepository
    {
        Task<IRating> CreateAsync(Guid userGuid, int wins, int defeats);
        Task<IRating> UpdateAsync(Guid userGuid, int wins, int defeats);
        Task<IList<IRating>> TopAsync(Guid userGuid, int limit = 10);
    }
}
