# easy-notion-api
for easy notion api

## How to use
``` javascript
const conn = new EasyNotion.DatabaseAPI('Your secret key', 'Your page ID')

const sendData = await conn.addDatabaseRow({
    'Name': 'Test',
    'Checkbox': true,
    'Result': 'Testing',
    'Tags': ['Test', 'Test2']
}).then(res => console.log(res))
```
Then, You can check the result on your page.



## Supported List
### DB - Insert Row
- title
- rich_text
- number
- url
- select
- multi select
- people
- email
- phone number
- data
- check box
- status