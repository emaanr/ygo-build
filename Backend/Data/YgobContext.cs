using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class YgobContext(DbContextOptions options) : DbContext(options)
    {
        // public DbSet<Card> Cards { get; set; }
        // public DbSet<Collection> Collections { get; set; }
        // public DbSet<Deck> Decks { get; set; }
        // public DbSet<Pack> Packs { get; set; }
        public DbSet<User> Users { get; set; }
        // public DbSet<CardCollection> CardCollections { get; set; }
        // public DbSet<CardDeck> CardDecks { get; set; }
        // public DbSet<CardPack> CardPacks { get; set; }
        // public DbSet<CollectionPacks> CollectionPacks { get; set; }
        // public DbSet<UserDeck> UserDecks { get; set; }
    }
}
