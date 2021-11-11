const { Client } = require('@notionhq/client')
const fs = require('fs')
const notion = new Client({ auth: process.env.NOTION_BEARER });

function toTitleCase (string) {
  const parts = string.split('');
  parts[0] = parts[0].toUpperCase();
  return parts.join('');
}
(async () => {
  const databaseID = process.env.PAINT_DATABASE_API;

  const files = fs.readdirSync(__dirname + "/paints");

  for (const json of files) {
    const paints = require(__dirname + '/paints/' + json);
    const tag = json.split('.')[0];
    for (const [name, url] of Object.entries(paints)) {

      const page = await notion.pages.create({
        parent: {
          database_id: databaseID
        },
        icon: {
          type: "external",
          external: {
            url
          }
        },
        properties: {
          "Name": {
            title: [
              {
                text: {
                  content: `${toTitleCase(tag)}: ${name}`
                }
              }
            ]
          },
          Type: {
            select: {
              name: tag
            }
          }

        }
      });
      console.info(`created page ${page.id}`);
    }
  } 
})();
