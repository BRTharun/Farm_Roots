using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Application.Services;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// builder.Services.AddDbContext<ApplicationDbContext>(option => option.UseSqlServer("name=ConnectionStrings:DefaultConnection"));
var provider = builder.Services.BuildServiceProvider();

var config = provider.GetRequiredService<IConfiguration>();

builder.Services.AddDbContext<ApplicationDbContext>(item => item.UseSqlServer(config.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin() // Allow any origin
                   .AllowAnyMethod() // Allow any HTTP method
                   .AllowAnyHeader(); // Allow any header
    });
});



var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors("AllowAllOrigins");
app.Run();
