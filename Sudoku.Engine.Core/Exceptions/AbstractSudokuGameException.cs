using System;

namespace Sudoku.Engine.Core.Exceptions
{
    public class AbstractSudokuGameException : Exception
    {
        public AbstractSudokuGameException()
        {

        }

        public AbstractSudokuGameException(string message) : base(message)
        {

        }

        public AbstractSudokuGameException(Exception e) : base(string.Empty, e)
        {

        }

        public AbstractSudokuGameException(string message, Exception e) : base(message, e)
        {

        }
    }
}
