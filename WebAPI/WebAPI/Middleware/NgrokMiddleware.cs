using System.Diagnostics;
using System.Security.Claims;

namespace WebAPI.Middleware
{
    public class NgrokMiddleware
    {
        private readonly RequestDelegate _next;

        public NgrokMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                if (!context.Request.Headers.ContainsKey("ngrok-skip-browser-warning"))
                {
                    context.Request.Headers.Add("ngrok-skip-browser-warning", "true");
                    
                }
                if (!context.Response.Headers.ContainsKey("ngrok-skip-browser-warning"))
                {
                    context.Response.Headers.Add("ngrok-skip-browser-warning", "true");
                }
                await _next(context);
            }
            catch (Exception ex)
            {
               Console.WriteLine(ex);
            }
        }
    }
}
