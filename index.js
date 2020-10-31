import axios from 'axios';

axios.get('https://public.tableau.com/profile/api/following/will7508?count=12&index=0').then((res) => {
  console.log(res.data)
})

console.log('Hello from JS 👋');
