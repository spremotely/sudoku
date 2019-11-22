using System;

namespace Sudoku.Engine.Core.Concurrent.Events
{
    public class SolvedGameEventArgs
    {
        public Guid WinnerUserGuid { get; }

        public SolvedGameEventArgs(Guid winnerUserGuid)
        {
            WinnerUserGuid = winnerUserGuid;
        }
    }
}
