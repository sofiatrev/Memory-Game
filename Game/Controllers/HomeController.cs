using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Game.Models;

namespace Game.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        var cards = GetCards(); // Method to get a list of cards
        return View("GameBoard",cards);
    }

    private List<Card> GetCards()
    {
        // Logic to generate and return a list of cards
        var colors = new[] { "red", "blue", "green", "yellow", "purple", "orange", "pink", "brown" };
        var cards = colors.SelectMany(color => new[] { new Card { Color = color }, new Card { Color = color } }).ToList();
        return cards.OrderBy(_ => Guid.NewGuid()).ToList(); // Shuffle cards
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
