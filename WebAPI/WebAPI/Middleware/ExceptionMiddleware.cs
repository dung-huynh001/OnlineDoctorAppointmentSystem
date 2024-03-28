using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Diagnostics;
using System.Net;
using System.Security.Claims;
using System.Text.Json;
using WebAPI.Exceptions;

namespace WebAPI.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                var stackTrace = new StackTrace(ex, true);
                var frame = stackTrace.GetFrame(0);
                var fileName = frame?.GetFileName();
                var lineNumber = frame?.GetFileLineNumber();
                var methodName = frame?.GetMethod()?.DeclaringType?.Name;

                var sEventCatg = fileName?.Substring(fileName?.LastIndexOf("\\") ?? 0).Replace("\\", "");
                var sEventMsg = ex.Message + " Line:" + lineNumber;
                var sEventSrc = methodName?.Substring(0, methodName.LastIndexOf(">") + 1);
                var sEventType = context.Request.Method;
                var sInsBy = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

                await TraceLog(sEventCatg!, sEventMsg, sEventSrc!, sEventType, sInsBy);

                _logger.LogError($"Something went wrong: {ex}");
                await HandleExceptionAsync(context, ex);
            }
        }

        public async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            context.Response.ContentType = "application/json";
            var response = context.Response;
            HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
            string errorMessage = ex.Message;

            switch (ex)
            {
                case BadRequestException badRequestException:
                    statusCode = HttpStatusCode.BadRequest;
                    break;
                case ValidationException validationException:
                    statusCode = HttpStatusCode.BadRequest;
                    errorMessage = JsonSerializer.Serialize(validationException.Errors);
                    break;
                case NotFoundException notFoundException:
                    statusCode = HttpStatusCode.NotFound;
                    break;
                default:
                    break;
            }

            context.Response.StatusCode = (int)statusCode;

            var errorDetail = new ErrorDetails()
            {
                Message = errorMessage,
                StatusCode = context.Response.StatusCode
            };

            await context.Response.WriteAsync(errorDetail.ToString());
        }

        private async Task TraceLog(string sEventCatg, string sEventMsg, string sEventSrc, string sEventType, string sInsBy)
        {
            string sTraceTime = DateTime.Now.ToString("ddMMMyyyyHH");
            string sLogFormat = DateTime.Now.ToShortDateString().ToString() + " " + DateTime.Now.ToLongTimeString().ToString() + " ==> ";

            string sTraceMsg = sEventCatg + "\t" + sEventMsg + "\t" + sEventSrc + "\t" + sEventType + "\t" + sInsBy + "\n";

            string loggingFolder = Path.Combine(Directory.GetCurrentDirectory(), "Logging/Exceptions");
            if (!Directory.Exists(loggingFolder))
            {
                Directory.CreateDirectory(loggingFolder);
            }

            string lstPathSeparator = Path.DirectorySeparatorChar.ToString();
            string lstMonth = DateTime.Now.Month < 10
                                         ? "0" + DateTime.Now.Month.ToString()
                                         : DateTime.Now.Month.ToString();
            string lstYear = DateTime.Now.Year.ToString();
            string lstDestination = loggingFolder + lstPathSeparator + lstYear + lstMonth + lstPathSeparator + DateTime.Now.ToString("ddMMM") + lstPathSeparator;
            if (!Directory.Exists(lstDestination))
                Directory.CreateDirectory(lstDestination);
            string sPathName = lstDestination + lstPathSeparator + sTraceTime + ".txt";
            StreamWriter sw = new StreamWriter(sPathName, true);
            await sw.WriteLineAsync(sLogFormat + sTraceMsg);
            sw.Flush();
            sw.Close();
        }

    }

    public class ErrorDetails
    {
        public int StatusCode { get; set; }
        public string Message { get; set; } = new string("");
        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
