using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MAPEAMENTO.Models;

namespace MAPEAMENTO.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

#pragma warning disable CS0649
        private readonly AppDbContext _context;
#pragma warning restore CS0649

        public HomeController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Chamado()
        {
            return View();
        }

        public IActionResult ListaDeErros()
        {
            var squares = _context.Squares.ToList();
            return View(squares);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}