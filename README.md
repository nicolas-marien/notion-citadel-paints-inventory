The Citadel Colors app is great, but it lacks the ability to sync the inventory and wishlist between devices.

This script will allow you to load a Notion database with the existing paints, so that you can use notion relations to create a synced inventory and wishlist.

You'll need to create a Notion Integration and a database dedicated to this procedure.
See [the Notion API documentation](https://developers.notion.com/reference/intro) to get started.

Your databse must have the two following properties:

- Name of type Title (should be there by default)
- Type of type Select (the values will be created automatically)

The JSON data comes from the official [Citadel Colors website](https://www.games-workshop.com/en-GB/detail?N=3815391097+2401632303&searchTerm=paint).
It has been extracted by running the following Javascript snippet `var paints = [...$$('.record-spotlight__item-image')].reduce((map, paint) => { map[paint.alt] = paint.src; return map; }, {})` on each paint type tab. 

To run the script, please paste the following command into your terminal (set the proper values for your workspace): `PAINT_DATABASE_API=CHANGE_ME NOTION_BEARER=CHANGE_ME node index.js`.
