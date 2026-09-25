using Microsoft.AspNetCore.Mvc;
using SSCAutoLights.Models;
using System.Diagnostics;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace SSCAutoLights.Controllers
{
    public class HomeController : Controller
    {
        private readonly IConfiguration _configuration;

        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Contact(bool success = false)
        {
            //tells the page if the form was submitted successfully or not
            ViewBag.Success = success;

            return View();
        }

        // Receives the contact form
        [HttpPost]
        public async Task<IActionResult> Contact(ContactForm form)
        {
            // Get Gmail information from secrets.json
            var emailAddress = _configuration["EmailSettings:Email"];
            var appPassword = _configuration["EmailSettings:AppPassword"];

            // Create a new email
            var message = new MimeMessage();

            // Who the email is from
            message.From.Add(new MailboxAddress(
                "SSC Auto Lights Website",
                emailAddress));

            //makes the replay button reply directly to the customer

            // Who receives the email
            message.To.Add(new MailboxAddress(
                "SSC Auto Lights",
                emailAddress));

            // Email subject
            message.Subject = $"{form.FullName}New Contact Form Submission";

            // Information inside the email
            message.Body = new TextPart("plain")
            {
                Text =
                   $"NEW PARTS SUBMISSION\n\n" +
                   $"Name: {form.FullName}\n" +
                   $"Company: {form.Company}\n" +
                   $"Phone: {form.Phone}\n" +
                   $"Email: {form.Email}\n" +
                   $"Part Type: {form.PartType}\n" +
                   $"Quantity: {form.Quantity}\n\n" +
                   $"Vehicle / Part Information:\n" +
                   $"{form.PartInfo}"
            };

            // Create the connection to Gmail
            using var smtp = new SmtpClient();

            // Connect to Gmail
            await smtp.ConnectAsync(
                "smtp.gmail.com",
                587,
                SecureSocketOptions.StartTls);

            // Log into Gmail
            await smtp.AuthenticateAsync(
                emailAddress,
                appPassword);

            // Send the email
            await smtp.SendAsync(message);

            // Disconnect from Gmail
            await smtp.DisconnectAsync(true);

            TempData["SuccessMessage"] = "Thank you! Your information has been sent. SSC Auto Lights will review your parts and contact you soon.";

            return RedirectToAction("Contact");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel 
            { 
                RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier 
            });
        }
    }
}
