using System;

namespace Sudoku.App.Exceptions
{
    public class SudokuHubException : Exception
    {
        public SudokuHubException()
        {

        }

        public SudokuHubException(string message) : base(message)
        {

        }

        public SudokuHubException(Exception e) : base(string.Empty, e)
        {

        }

        public SudokuHubException(string message, Exception e) : base(message, e)
        {

        }
    }
}
