using Microsoft.EntityFrameworkCore;

namespace Backend.Data {
    public class YgobDbContext : DbContext {
        public DbSet<Card> Cards { get; set; }
        public DbSet<Collection> Collections { get; set; }
        public DbSet<Deck> Decks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<CardCollection> CardCollections { get; set; }
        public DbSet<CardDeck> CardDecks { get; set; }
        public DbSet<UserDeck> UserDecks { get; set; }
    }
}
