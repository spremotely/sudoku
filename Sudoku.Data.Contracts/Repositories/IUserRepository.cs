using System;
using System.Threading.Tasks;
using Sudoku.Data.Contracts.Models;

namespace Sudoku.Data.Contracts.Repositories
{
    public interface IUserRepository
    {
        Task<IUser> GetAsync(Guid guid);
        Task<IUser> CreateAsync(string name);
    }
}
