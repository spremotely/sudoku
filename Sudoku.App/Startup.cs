using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.DependencyInjection;
using Sudoku.App.Hubs;
using Sudoku.Data.Contracts;
using Sudoku.Data.InMemory;
using Sudoku.Engine.Core;
using Sudoku.Engine.Core.Contracts;

namespace Sudoku.App
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
            services.AddSingleton<IUserRepository, InMemoryUserRepository>();
            services.AddSingleton<ISudokuGenerator, FixedSudokuGenerator>();
            services.AddSingleton<ISudokuSolver, FixedSudokuSolver>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseSignalR(routes =>
            {
                routes.MapHub<SudokuHub>("/sudokuHub");
            });
        }
    }
}
