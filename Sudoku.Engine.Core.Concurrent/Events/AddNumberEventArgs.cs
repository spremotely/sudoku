using Sudoku.Engine.Core.Contracts.Models;

namespace Sudoku.Engine.Core.Concurrent.Events
{
    public class AddNumberEventArgs
    {
        public ISudokuNumber Number { get; }

        public AddNumberEventArgs(ISudokuNumber number)
        {
            Number = number;
        }
    }
}
