import axios from 'axios'

export const addUser = async (req, host='') => {
  console.log('Action addUser : ', req)
  const res = await axios.post(host + '/api/v1/users', req)
  console.log('Res axios : ',res)
  return res
}