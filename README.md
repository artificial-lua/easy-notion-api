# easy-notion-api
for easy notion api

## How to use
``` javascript
const conn = new EasyNotion.DatabaseAPI('Your secret key', 'Your page ID')

console.log(await conn.getDatabaseColumns())

/*
{
    Check: { 
        id: '1234', 
        name: 'Check', 
        type: 'checkbox', 
        checkbox: {}
    },
    Uptime: {
        id: '1235',
        name: 'Uptime',
        type: 'created_time',
        created_time: {}
    },
    Result: { 
        id: '1236', 
        name: 'Result', 
        type: 'rich_text', 
        rich_text: {} 
    },
    Tags: {
        id: '1237',
        name: 'Tags',
        type: 'multi_select',
        multi_select: { options: [Array] }
    },
    Name: { 
        id: 'title', 
        name: 'Name', 
        type: 'title', 
        title: {} 
        }
}
*/

const sendData = await conn.addDatabaseRow({
    'Name': 'Test',
    'Checkbox': true,
    'Result': 'Testing',
    'Tags': ['Test', 'Test2']
}).then(res => console.log(res))

/*
{ result: 'success' }
*/
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