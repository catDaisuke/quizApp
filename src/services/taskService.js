// import uuidV4 from 'uuid/v4'
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
    mutation createQuizAppProgressStatus($num: Int!, $status: String!) {
      createQuizAppProgressStatus(
        input: {
          num: $num, status: $status
        }
      ) {
        num
        status
      }
    }
    `
    const quizAppProgressStatusDetails = {
      // id: uuidV4(),
      num: 1,
      status: 'Q'
    }
    const newTask = await API.graphql(graphqlOperation(createQuizAppProgressStatus, quizAppProgressStatusDetails))
    return newTask
  },
  async updateQuizAppProgressStatus(taskDetails) {
    const updateQuizAppProgressStatus = `
    mutation updateQuizAppProgressStatus($id: ID!, $num: Int!, $status: String!) {
      updateQuizAppProgressStatus(
        input: {
          id: $id
          num: $num
          status: $status
        }
      ) {
        id
        num
        status
      }
    }
    `
    const updatedQuizAppProgressStatus = await API.graphql(graphqlOperation(updateQuizAppProgressStatus, taskDetails))
    return updatedQuizAppProgressStatus
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
  },
  async onCreateQuizAppProgressStatus(callback) {
    const subscriptionQuizAppProgressStatus = `subscription onCreateQuizAppProgressStatus {
      onCreateQuizAppProgressStatus {
        id
        num
        status
      }
    }`
    const subscription = API.graphql(graphqlOperation(subscriptionQuizAppProgressStatus))
      .subscribe({
        next: function () {
          callback()
        }
      })
    return subscription
  },
  async onUpdateQuizAppProgressStatus(callback) {
    const subscriptionQuizAppProgressStatus = `subscription onUpdateQuizAppProgressStatus {
      onUpdateQuizAppProgressStatus {
        id
        num
        status
      }
    }`
    const subscription = API.graphql(graphqlOperation(subscriptionQuizAppProgressStatus))
      .subscribe({
        next: function () {
          callback()
        }
      })
    return subscription
  }
}