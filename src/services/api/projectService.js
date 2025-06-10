import projectsData from '../mockData/projects.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const projectService = {
  async getAll() {
    await delay(300)
    return [...projectsData]
  },

  async getById(id) {
    await delay(200)
    const project = projectsData.find(p => p.id === id)
    if (!project) {
      throw new Error('Project not found')
    }
    return { ...project }
  },

  async create(projectData) {
    await delay(400)
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    projectsData.push(newProject)
    return { ...newProject }
  },

  async update(id, updateData) {
    await delay(300)
    const index = projectsData.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }
    
    projectsData[index] = {
      ...projectsData[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    return { ...projectsData[index] }
  },

  async delete(id) {
    await delay(300)
    const index = projectsData.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }
    
    projectsData.splice(index, 1)
    return true
  }
}

export default projectService