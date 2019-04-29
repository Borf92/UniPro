using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UniProCore.Models;

namespace UniProData.Mapping
{
    public class OrderMap : UniProEntityTypeConfiguration<Order>
    {
        public override void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Order");
            builder.HasKey(_ => _.Id);
            builder.Property(_ => _.Id).ValueGeneratedOnAdd();
        }
    }
}
