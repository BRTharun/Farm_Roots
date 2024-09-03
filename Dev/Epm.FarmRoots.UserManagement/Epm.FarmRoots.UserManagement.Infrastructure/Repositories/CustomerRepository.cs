#pragma warning disable
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Epm.FarmRoots.UserManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Infrastructure.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ApplicationDbContext _context;
        public CustomerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

     
        public async Task<Customer> RegisterCustomerAsync(Customer customer)
        {
            var existingCustomer = await _context.CustomerDb.FirstOrDefaultAsync(c => c.Email == customer.Email);

            if (existingCustomer != null)
            {
                throw new InvalidOperationException("An account with this email already exists.");
            }
            _context.CustomerDb.Add(customer);
            await _context.SaveChangesAsync();

            return customer;
        }


        public async Task<Customer> DeleteCustomerAsync(int id)
        {
            var customer = await _context.CustomerDb.FirstOrDefaultAsync(c => c.CustomerId == id);

            if (customer == null)
            {
                throw new InvalidOperationException("Customer not found.");
            }

            _context.CustomerDb.Remove(customer);
            await _context.SaveChangesAsync();
            return customer;
        }

        public async Task<Customer> UpdateCustomerDetailsAsync(Customer customer)
        {
            var existingCustomer= await _context.CustomerDb.FirstOrDefaultAsync(v => v.CustomerId == customer.CustomerId);

            if (existingCustomer == null)
            {
                throw new InvalidOperationException("Customer not found.");
            }

            existingCustomer.Name = customer.Name;
            existingCustomer.Email = customer.Email;
            await _context.SaveChangesAsync();
            return customer;
        }
        public async Task<List<Customer>> GetAllCustomersAsync()
        {
            return await _context.CustomerDb.ToListAsync();
        }

        public async Task<Customer> LoginCustomerAsync(string email, string password)
        {
            var customer = await _context.CustomerDb.FirstOrDefaultAsync(c => c.Email == email && c.Password == password);

            if (customer == null)
            {
                throw new UnauthorizedAccessException("Invalid credentials.");
            }

            return customer;
        }

        public async Task<Customer> GetCustomerByEmailAsync(string email)
        {
            return await _context.CustomerDb.FirstOrDefaultAsync(c => c.Email == email);
        }


    }
}
