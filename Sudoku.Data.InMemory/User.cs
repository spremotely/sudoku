using System;
using Sudoku.Data.Contracts;

namespace Sudoku.Data.InMemory
{
    public class User : IUser
    {
        public Guid Guid { get; }
        public string Name { get; set; }
        public int Wins { get; set; }

        public User(string name)
        {
            Name = name;
            Guid = Guid.NewGuid();
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Guid);
        }

        public override bool Equals(object obj)
        {
            if (obj == null)
            {
                return false;
            }

            return GetHashCode() == obj.GetHashCode();
        }
    }
}
