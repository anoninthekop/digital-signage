import axios from 'axios'

export const addUser = async (req, host='') => {
  try{
   return await axios.post(host + '/api/v1/users', req)
  }catch(err){
    return err
  }
}

export const getUserByUsername = async (username, host = '') => {
  try{
  const user = await axios.post(host + '/api/v1/users/signin', username)
  console.log('user : ', user)
  return user
}catch(err){
  return err
}
}