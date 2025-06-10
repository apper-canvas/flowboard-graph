import tasksData from '../mockData/tasks.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const taskService = {
  async getAll() {
    await delay(300)
    return [...tasksData]
  },

  async getById(id) {
    await delay(200)
    const task = tasksData.find(t => t.id === id)
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    tasksData.push(newTask)
    return { ...newTask }
  },

  async update(id, updateData) {
    await delay(300)
    const index = tasksData.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    tasksData[index] = {
      ...tasksData[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    return { ...tasksData[index] }
  },

  async delete(id) {
    await delay(300)
    const index = tasksData.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    tasksData.splice(index, 1)
    return true
  },

  async getByColumnId(columnId) {
    await delay(250)
    return tasksData.filter(task => task.columnId === columnId)
  }
}

export default taskService