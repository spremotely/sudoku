using System;
using System.Collections.Generic;
using System.Linq;
using Sudoku.Data.Contracts;

namespace Sudoku.Data.InMemory
{
    public class InMemoryUserRepository : IUserRepository
    {
        private readonly List<User> _users = new List<User>();

        public IUser GetByName(string name)
        {
            lock (_users)
            {
                return _users.FirstOrDefault(u => string.Equals(u.Name, name, StringComparison.OrdinalIgnoreCase));
            }
        }

        public IUser GetByGuid(Guid guid)
        {
            lock (_users)
            {
                return _users.FirstOrDefault(u => u.Guid == guid);
            }
        }

        public IUser Create(string name)
        {
            lock (_users)
            {
                var newUser = new User(name);
                _users.Add(newUser);
                return newUser;

            }
        }

        public IUser UpdateWins(Guid guid, int wins)
        {
            lock (_users)
            {
                var existingUser = GetByGuid(guid);

                if (!(existingUser is User existingConcreteUser))
                {
                    return null;
                }

                existingConcreteUser.Wins = wins;
                return existingUser;
            }
        }

        public IList<IUser> Top(int limit = 10)
        {
            lock (_users)
            {
                return _users.OrderByDescending(u => u.Wins).Cast<IUser>().Take(limit).ToList();
            }
        }

        public IList<IUser> ListByGuids(IList<Guid> guids)
        {
            lock (_users)
            {
                return _users.Where(u => guids.Contains(u.Guid)).Cast<IUser>().ToList();
            }
        }
    }
}
