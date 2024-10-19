import { http, HttpResponse } from 'msw'
import { ItemType } from '../interfaces/interfaces'
 
export const handlers = [  
  http.get('/cardsData', async () => {    
    let data:ItemType[] = []
    let storedData = localStorage.getItem('cardsData')    
    if(storedData){      
      data = JSON.parse(storedData)      
    }
    else{            
      await fetch("/data.json")
      .then((response) => response.json())
      .then(d => {
        localStorage.setItem('cardsData', JSON.stringify(d))
        data = d
      })
    }

    return HttpResponse.json(data)
  }),
  http.post('/updateCards', async ({ request }) => {
    const data = await request.json()
    localStorage.setItem('cardsData', JSON.stringify(data))

    return HttpResponse.json({ success: true })
  })
]