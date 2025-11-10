using System;

namespace ASP_NET_Core.Models;
public class Appointment {
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}
