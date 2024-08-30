using AutoMapper;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Application.Services;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Epm.FarmRoots.ProductCatalogue.API;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddScoped<ICategoryService, CategoryService>();

// Register the repositories from the Infrastructure layer
builder.Services.AddScoped<ICategoryRepository, CategoryRepo>();

// AutoMapper Service register
IMapper mapper = CategoryMapper.RegisterMaps().CreateMapper();
builder.Services.AddSingleton(mapper);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddDbContext<ProductCatalogueDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<CustomExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(option => option.AllowAnyOrigin());
app.UseAuthorization();

app.MapControllers();
ApplyMigration();

app.Run();

void ApplyMigration()
{
    using (var scope = app.Services.CreateScope())
    {
        var _db = scope.ServiceProvider.GetRequiredService<ProductCatalogueDbContext>();

        if (_db.Database.GetPendingMigrations().Count() > 0)
        {
            _db.Database.Migrate();
        }
    }
}
