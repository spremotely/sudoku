using System.Collections.Generic;
using System.Linq;
using Sudoku.Engine.Core.Contracts.Models;

namespace Sudoku.Engine.Core.Concurrent
{
    public class ConcurrentSessionMapper<T> : ISessionMapper<T>
    {
        private readonly Dictionary<string, T> _map = new Dictionary<string, T>();

        public bool Add(string session, T value)
        {
            lock (_map)
            {
                return _map.TryAdd(session, value);
            }
        }

        public T Get(string session)
        {
            lock (_map)
            {
                return _map.TryGetValue(session, out var value) ? value : default(T);
            }
        }

        public bool Remove(string session)
        {
            lock (_map)
            {
                return _map.Remove(session);
            }
        }

        public bool Contains(T value)
        {
            lock (_map)
            {
                return _map.ContainsValue(value);
            }
        }

        public IList<T> List()
        {
            lock (_map)
            {
                return _map.Values.ToList();
            }
        }
    }
}
