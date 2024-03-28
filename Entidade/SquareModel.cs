using System.ComponentModel.DataAnnotations;

public class SquareModel
{
    public int Id { get; set; }

    [Required]
    public string Status { get; set; }
}