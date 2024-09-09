using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Application.Services;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Infrastructure;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Http.Features;
using Swashbuckle.AspNetCore.SwaggerGen;

var builder = WebApplication.CreateBuilder(args);

// Add services to the DI container.
builder.Services.AddControllers();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepo>();
builder.Services.AddScoped<IProductSearchRepository, ProductSearchRepository>();
builder.Services.AddScoped<IProductSearchService, ProductSearchService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IImageService, ImageService>();

// Register DbContexts
builder.Services.AddDbContext<ProductDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDbContext<ProductCatalogueDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDbContext<InventoryDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDbContext<ImageDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// CORS policy setup
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


// Configure file upload size (optional, you can adjust the limit)
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 104857600; // 100 MB limit, adjust as needed
});

//// Swagger configuration for file upload
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Product Catalogue API", Version = "v1" });

    // Add file upload support
    c.OperationFilter<FileUploadOperationFilter>();
});




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
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

// Apply database migrations
ApplyMigrations(app);

await app.RunAsync();

void ApplyMigrations(IHost app)
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;

    MigrateDbContext<ProductCatalogueDbContext>(services);
    MigrateDbContext<InventoryDbContext>(services);
    MigrateDbContext<ProductDbContext>(services);
    MigrateDbContext<ImageDbContext>(services);
}

void MigrateDbContext<TContext>(IServiceProvider services) where TContext : DbContext
{
    var context = services.GetRequiredService<TContext>();
    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }
}