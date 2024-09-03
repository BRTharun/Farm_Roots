using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Epm.FarmRoots.IdentityService;

public static class IdentityServiceConfiguration
{
    public static void AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<TokenService>();
        // Add other necessary services and configurations
    }
}