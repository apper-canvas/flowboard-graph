import usersData from '../mockData/users.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const userService = {
  async getAll() {
    await delay(300)
    return [...usersData]
  },

  async getById(id) {
    await delay(200)
    const user = usersData.find(u => u.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    return { ...user }
  },

  async create(userData) {
    await delay(400)
    const newUser = {
      id: Date.now().toString(),
      ...userData
    }
    usersData.push(newUser)
    return { ...newUser }
  },

  async update(id, updateData) {
    await delay(300)
    const index = usersData.findIndex(u => u.id === id)
    if (index === -1) {
      throw new Error('User not found')
    }
    
    usersData[index] = {
      ...usersData[index],
      ...updateData
    }
    
    return { ...usersData[index] }
  },

  async delete(id) {
    await delay(300)
    const index = usersData.findIndex(u => u.id === id)
    if (index === -1) {
      throw new Error('User not found')
    }
    
    usersData.splice(index, 1)
    return true
  }
}

export default userService