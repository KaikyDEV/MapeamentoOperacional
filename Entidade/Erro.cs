using System.ComponentModel.DataAnnotations;

namespace MAPEAMENTO.Entidade;

public class Erro
{
    [Key]
    public int Id { get; set; }
    public string erro { get; set; }
    public string Status { get; set; }
    public DateTime DateTime { get; set; }

    public Erro()
    {
        // Inicializa a propriedade DateTime com a data e hora atual
        DateTime = DateTime.Now;
    }
}
