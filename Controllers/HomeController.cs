using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MAPEAMENTO.Models;
using MAPEAMENTO.Entidade;
using Microsoft.EntityFrameworkCore;

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



        [HttpPost]
        public async Task<IActionResult> SaveData([FromBody] List<Erro> errors)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // Salvar entradas no banco de dados
                    foreach (var error in errors)
                    {
                        _context.Erros.Add(error);
                    }

                    await _context.SaveChangesAsync();
                    return Ok(); // Resposta 200 OK
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Erro ao salvar entradas no banco de dados");
                    return StatusCode(500); // Resposta 500 Internal Server Error
                }
            }
            else
            {
                return BadRequest(ModelState); // Resposta 400 Bad Request se o modelo não for válido
            }
        }
        public IActionResult ListaDeErros()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

    }


}
