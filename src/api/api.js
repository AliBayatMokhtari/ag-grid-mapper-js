const api = {
  getSchemes: async () => {
    const url = 'http://eoa.nrayvarz.ir/admin_api/api/v1/Schema/Gets'
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => data)
  },
  getStaffs: async payload => {
    const url = 'http://eoa.nrayvarz.ir/admin_api/api/v1/Staff/Gets'
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => data)
  },
}

export default api
