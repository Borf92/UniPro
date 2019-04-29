using System;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UniProCore.Identity;
using UniProCore.Models;

namespace UniProData
{
    public class UniProContext : IdentityDbContext<ApplicationUser>
    {
        public UniProContext(DbContextOptions<UniProContext> options)
            : base(options)
        {
            //options.CommandTimeout = 180;
            //options.SetInitializer<TeiContext>(null);
            //options.ProxyCreationEnabled = false;
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //запрешаем каскадное удаление 
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            var typesToRegister = Assembly.GetExecutingAssembly().GetTypes()
                .Where(type => !String.IsNullOrEmpty(type.Namespace))
                .Where(type => type.BaseType != null &&
                               type.BaseType.IsGenericType &&
                               type.BaseType.GetGenericTypeDefinition() == typeof(UniProEntityTypeConfiguration<>));
            foreach (var type in typesToRegister)
            {
                dynamic configurationInstance = Activator.CreateInstance(type);
                modelBuilder.ApplyConfiguration(configurationInstance);
            }

            //modelBuilder.Property<DateTime>().Configure(c => c.HasColumnType("datetime2"));
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Order> Order { get; set; }
    }
}
