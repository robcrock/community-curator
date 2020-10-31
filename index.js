import axios from 'axios';

const CORSProxy = 'https://cors-anywhere.herokuapp.com/'
const baseEndpoint = 'https://public.tableau.com/profile/api/';

axios.get(`${CORSProxy}${baseEndpoint}will7508`).then((res) => {
  console.log(res.data.workbooks)
})
