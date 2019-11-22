namespace Sudoku.Engine.Core.Concurrent.Events
{
    public class NewGameEventArgs
    {
        public int[,] Sudoku { get; }

        public NewGameEventArgs(int[,] sudoku)
        {
            Sudoku = sudoku;
        }
    }
}
