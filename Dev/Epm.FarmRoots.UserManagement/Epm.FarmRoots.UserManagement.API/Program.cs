#pragma warning disable
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Application.Services;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Epm.FarmRoots.UserManagement.Infrastructure.Data;
using Epm.FarmRoots.UserManagement.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<ICustomerService, CustomerRegisterService>();
builder.Services.AddScoped<IVendorService, VendorRegisterService>();

builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IVendorRepository, VendorRepository>();


var provider = builder.Services.BuildServiceProvider();
var config = provider.GetRequiredService<IConfiguration>();
builder.Services.AddDbContext<RegistrationDbContext>(item => item.UseSqlServer(config.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<CustomerRegisterService>(); 
builder.Services.AddScoped<VendorRegisterService>();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<RegistrationDbContext>();
    try
    {
        dbContext.Database.Migrate();
    }
    catch (Exception ex)
    {
        Console.WriteLine("An error occurred while migrating the database.");
        Console.WriteLine(ex.Message);
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAllOrigins");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
