# Yu-Gi-Oh! Build

> Yu-Gi-Oh! Build "Decks" and "Simulate" them.

- [Yu-Gi-Oh! Build](#yu-gi-oh-build)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Scripts](#scripts)
  - [Scope](#scope)
    - [MVP](#mvp)
      - [Goals](#goals)
      - [Decks](#decks)
        - ["Deckbuilder" Feature](#deckbuilder-feature)
        - ["Saved Decks" Feature](#saved-decks-feature)
    - [Beyond MVP](#beyond-mvp)
      - ["Favorite Cards" Feature](#favorite-cards-feature)
      - ["Simulate" Feature](#simulate-feature)

### Frontend

- Angular 20(.2.0)

**Node**

- Node 22(.18.0)
- NPM 11(.5.2)
- NPX 11(.5.2)

### Backend

- .NET 9(.0.304)

### Scripts

- Python 13(.13.3)

## Scope

### MVP

> Will stop development on project unless I feel called to continue it again at some point in the future.

#### Goals

1. Fully functional Frontend/Backend with "Yu-Gi-Oh! GX: Spirit Caller" Starter Pack Card Collections available for Deck creation.
2. Optional User Create Account/Login/Logout with Username, Password, and Display Name when logged in.
3. Users can create and save Decks (legal or illegal, user notified before save or export) through two different avenues depending on whether logged in or not.
4. DB queries work - search, filtering, cards, etcetera.
5. Able to run the project locally by pulling the project as-is and running the Docker files included - detailed intructions provided once complete.

#### Decks

> Has two tabs: "Deckbuilder" and "Saved Decks".

##### "Deckbuilder" Feature

> "Deckbuilding" tab under "Decks" route.

1. Optional "Search" or "Filter" cards.
2. Automatically lists cards in "Passcode Order" but can be filtered in "Alphabetical Order" as well.
3. Cards in the "Cards" section have a button on the top right corner of the card.
   1. The button is a "Green +" if count of those cards in "Deck" is 0 in order to add them to the "Deck".
   2. One a card is added to "Deck", the instance of the Card in "Cards" will have a "1" instead of the "Green +".
   3. Press on the "1" to add another instance of the card to the deck, more generically this can be though of at "Blue `<count>`.
   4. Once max count for a card is reached, the button turns into a "Grey/Disabled `maxCount`" which is 3 in this case.
4. Clicking on a "Card" in "Cards" will open a closable panel to display the Card blown up + more information about it.
5. Buttons under the Deckbuilder section to do things with the Deck that was built.
   1. `Export` which will export the Deck as a file to save to your computer (.ygo.json(?)).
   2. `Import` which will import the Deck from a properly file whose content is properly formatted (.ygo.json(?)).
   3. `Save to <isLoggedIn ? Account : Session>` save the deck to the "My Decks" tab on the "Decks" page.
      1. `Save to Account` posts deck to the database, survives after sessions end.
      2. `Save to Session` saves the deck to the current session ephemerally, it is gone after the session ends.
6. "Deck" and "Card" section can be viewed and interacted with as "Card" images with the buttons OR in textual "List" form.
7. Deck "Name" input box must be non-empty before any of the buttons work and do not have to be unique since they will have timestamps and an id associated with them on a per-user or per-session basis.

##### "Saved Decks" Feature

> "Saved Decks" tab under "Decks" route.

1. Has a section on the left with the Deck Names.
2. Right side will show the cards in the selected deck in either "Card" or "List" form.
3. Buttons under the Saved Decks section will do things with the saved decks.
   1. `Delete` which will delete the selected Deck from either the Account or Session.
   2. `Edit` which will load the deck into the Deckbuilder with some special string format autopopulated in the name so the `Save to <>` button knows to make an update instead of a new deck. Users will get a modal when saving to make them confirm they want to overwrite/edit the deck.
   3. `Export` will do the same thing as on Deckbuilder, not sure if I want `Import` here or not yet.
4. Should also open a panel with more card information but not sure how yet.

### Beyond MVP

> Extra stuff I may or may not ever implement.

#### "Favorite Cards" Feature

- Favorite Cards tab in Decks to view favorited cards, only available for logged in users I guess?

#### "Simulate" Feature

- Include Speed Duel collections, starting with "Yu-Gi-Oh! Speed Duel GX: Academy Box" set.
- Introduce battle simulation feature in the "Simulate" navigation item.
- Mock simulation feature with the "Yu-Gi-Oh! Speed Duel GX: Academy Box" decks.
- Simulate in "Speed Duel" or "Normal Duel" modes and allow "Custom Duel" as well (me and my friend found that Speed Dueling with 8000 LP instead of 4000 LP was more enjoyable for us).
