
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Core.Entities
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        public required string Name { get; set; }

        public required string Email { get; set; }

        public required string PhoneNumber { get; set; }

        public required string Password { get; set; }
    }
}
