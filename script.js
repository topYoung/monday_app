// let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMzNTg4OTE2MCwiYWFpIjoxMSwidWlkIjo1NzQ0NDIwOSwiaWFkIjoiMjAyNC0wMy0yMVQwMjo0MDoyNS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTIyNjMxODUsInJnbiI6InVzZTEifQ.TWvpOEhzwOTH5TeoaFeIbkUJAMSIWBytryEIH4cUrEw'

let query = 'query { boards(ids: 6292532342 limit: 10) { columns{id} items_page{ items{ name column_values{ id text value }}}}}';


const monday = window.mondaySdk();
let boardId = '';
let userId = '';

// monday.listen("context", res => {
//         console.log('res==',res)
//         // from the res json data to get 
//         // data.boardId
//         boardId = res.data.boardId; 
//         // console.log('boardId')
//         // ata.user.id
//         userId = res.data.user.id;
//         console.log("boardId=",boardId)
//         // checkUserAuthorization(userId, boardId);
//     });

monday.api(query).then(res => {
    console.log("query_res=", res);
    /* { data: { users: [{id: 12312, name: "Bart Simpson"}, {id: 423423, name: "Homer Simpson"}] } } */
    let items = res.data.boards.items
    console.log('items=',items)

    // let id = res.data.boards[0].items_page.items[1].id
    // let json = res.data.boards[0].items_page.items[1].column_values[0].value
    let text = res.data.boards[0].items_page.items[2].column_values[0].text
    // json = json.json()
    console.log('id=', id)
    console.log('json=', json)
    console.log('text=', text)
    let imgList = text.split(',')
    console.log('imgList.len=', imgList.length)
    console.log('imgList=', imgList)
    if (imgList.length > 0) {
        for (let i = 0; i < imgList.length; i++) {
            let div = document.createElement('div')
            div.id = "img" + i
            div.className = 'item'
            let img = document.createElement('img')
            img.src = imgList[i]
            img.className = 'image'
            img.onload = function() {
                div.appendChild(img)

            }

            content.appendChild(div)
        }
    }
});

// fetch ("https://api.monday.com/v2", {
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization' : token
//    },
//    body: JSON.stringify({
//      'query' : query
//    })
//   })
//    .then(res => res.json())
//    .then(res => {
//       console.log('res==',res)
//       let id = res.data.boards[0].items_page.items[1].id
//       let json = res.data.boards[0].items_page.items[1].column_values[0].value
//       let text = res.data.boards[0].items_page.items[1].column_values[0].text
//       // json = json.json()
//       console.log('id=',id)
//       console.log('json=',json)
//       console.log('text=',text)
//       let imgList = text.split(',')
//       console.log('imgList.len=',imgList.length)
//       console.log('imgList=',imgList)
//       if(imgList.length > 0){
//         for(let i=0;i<imgList.length;i++){
//           let div = document.createElement('div')
//           div.id = "img" + i
//           div.className = 'item'
//           let img = document.createElement('img')
//           img.src = imgList[i]
//           img.className = 'image'
//           img.onload = function() {
//                  div.appendChild(img)   

//           }

//           content.appendChild(div)
//         }
//       }
//     });

// fetch ("https://api.monday.com/v2", {
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization' : token,
//     'API-Version' : '2023-04'
//    },
//    body: JSON.stringify({
//      'query' : 'query{boards (limit:4) {id name} }'
//    })
//   });
//   .then(res => res.json())
//   .then(result => {
//     console.log('res==',result)
//   });