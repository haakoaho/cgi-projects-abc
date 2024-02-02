using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;

namespace EmailNotification.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
            // Load environment variables from the .env file
            DotNetEnv.Env.Load();
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public void Get()
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("FromName", "Name nameson"));
            message.To.Add(new MailboxAddress("", "defensiveespeon@gmail.com"));
            message.Subject = "test message";
            message.Body = new TextPart("plain") { Text = "hello there" };

            using var client = new SmtpClient();
            client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);

            // Retrieve the email username and password from environment variables
            string emailUsername = Environment.GetEnvironmentVariable("EMAIL_USERNAME");
            string emailPassword = Environment.GetEnvironmentVariable("EMAIL_PASSWORD");

            client.Authenticate(emailUsername, emailPassword);
            client.Send(message);
            client.Disconnect(true);
        }
    }
}
