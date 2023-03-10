import axios from 'axios'

export const getDisplays = async (host = '') => {
  const res = await axios.get(host + '/api/v1/display')
  if (res && res.data) {
    return res.data
  }
}

export const addDisplay = async (host = '') => {
  const res = await axios.post(host + '/api/v1/display')
  if (res && res.data) {
    return res.data
  }
}

export const getDisplay = (id, host = '') => {
  return axios.get(host + '/api/v1/display/' + id).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const deleteDisplay = (id, host = '') => {
  return axios.delete(host + '/api/v1/display/' + id).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const updateDisplay = (id, data, host = '') => {
  return axios.patch(host + '/api/v1/display/' + id, data).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}
