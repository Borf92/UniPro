using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace UniProData
{
    public abstract class UniProEntityTypeConfiguration<T> : IEntityTypeConfiguration<T> where T : class
    {
        public abstract void Configure(EntityTypeBuilder<T> builder);
    }
}
