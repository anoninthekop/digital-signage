import axios from 'axios'

export const addUser = (req, host='') => {
  console.log('Action addUser : ', req)
  return axios.post(host + '/api/v1/users',req)
}