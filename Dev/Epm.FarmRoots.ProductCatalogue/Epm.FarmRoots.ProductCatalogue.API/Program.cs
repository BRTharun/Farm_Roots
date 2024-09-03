using Epm.FarmRoots.ProductCatalogue.Application.Mappings;
using Epm.FarmRoots.ProductCatalogue.Application.Services;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Infrastructure;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Register AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()  // Allow requests from any origin
                  .AllowAnyHeader()  // Allow any headers
                  .AllowAnyMethod(); // Allow any HTTP methods
        });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<ProductDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IProductSearchRepository, ProductSearchRepository>();
builder.Services.AddScoped<IProductSearchService, ProductSearchService>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowAll"); // Use the CORS policy


app.UseAuthorization();

app.MapControllers();

app.Run();
