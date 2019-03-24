import uuidV4 from 'uuid/v4'
import { API, graphqlOperation } from 'aws-amplify'
export default {
  async getQuizAppProgressStatus () {
    const listQuizAppProgressStatus = `query listQuizAppProgressStatuses {
      listQuizAppProgressStatuses  {
        items {
          id
          num
          status
        }
      }
    }`
    const QuizAppProgressStatus = await API.graphql(graphqlOperation(listQuizAppProgressStatus))
    return QuizAppProgressStatus.data.listQuizAppProgressStatuses.items
  },
  /* todo 以下修正 */
  async createQuizAppProgressStatus() {
    const createQuizAppProgressStatus = `
    mutation createTask($id: ID!, $num: Int!, status: String!) {
      createTask(
        input: {
          id: $id, title: $title, completed: $completed
        }
      ) {
        id
        num
        status
      }
    }
    `
    const quizAppProgressStatusDetails = {
      id: uuidV4(),
      num: 1,
      status: 'Q'
    }
    const newTask = await API.graphql(graphqlOperation(createQuizAppProgressStatus, quizAppProgressStatusDetails))
    return newTask
  },
  async updateTask(taskDetails) {
    const updateTask = `
    mutation updateTask($id: ID!, $title: String!, $completed: Boolean!) {
      updateTask(
        input: {
          id: $id
          title: $title
          completed: $completed
        }
      ) {
        id
        title
        completed
      }
    }
    `
const updatedTask = await API.graphql(graphqlOperation(updateTask, taskDetails))
    return updatedTask
  },
  async deleteTask(taskId) {
    const deleteTask = `
    mutation deleteTask($id: ID!) {
      deleteTask(
        input: {
          id: $id
        }
      ) {
        id
      }
    }
    `
const taskDetails = {
      id: taskId
    }
return API.graphql(graphqlOperation(deleteTask, taskDetails))
  }
}