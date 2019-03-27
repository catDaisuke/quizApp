// import uuidV4 from 'uuid/v4'
import { API, graphqlOperation } from 'aws-amplify'
export default {
  /* getList */
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

  async getQuizAppMembers () {
    const listQuizAppMembers = `query listQuizAppMembers {
      listQuizAppMembers  {
        items {
          id
          userId
          password
          score
        }
      }
    }`
    const QuizAppMember = await API.graphql(graphqlOperation(listQuizAppMembers))
    return QuizAppMember.data.listQuizAppMembers.items
  },

  async getQuizAppQuestions () {
    const listQuizAppQuestions = `query listQuizAppQuestions {
      listQuizAppQuestions  {
        items {
          id
          title
          sentence
          choise1
          choise2
          choise3
          choise4
          ans
        }
      }
    }`
    const QuizAppQuestion = await API.graphql(graphqlOperation(listQuizAppQuestions))
    return QuizAppQuestion.data.listQuizAppQuestions.items
  },
  /* todo 以下修正 */
  async createQuizAppMember(inputId, inputPassword) {
    const createQuizAppMember = `
    mutation createQuizAppMember($userId: String!, $password: String!, $score: Int!) {
      createQuizAppMember(
        input: {
          userId:$userId, password: $password, score: $score
        }
      ) {
        userId
        password
        score
      }
    }
    `
    const quizAppMemberDetails = {
      userId: inputId,
      password: inputPassword,
      score: 0
    }
    const newTask = await API.graphql(graphqlOperation(createQuizAppMember, quizAppMemberDetails))
    return newTask
  },
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
  async updateQuizAppMember(member) {
    const updateQuizAppMember = `
    mutation updateQuizAppMember($id: String!, $userId: String!, $password: String!, $score: Int) {
      updateQuizAppMember(
        input: {
          id: $id
          userId: $userId
          password: $password
          score: $score
        }
      ) {
        id
        userId
        password
        score
      }
    }
    `
    const updatedQuizAppMember = await API.graphql(graphqlOperation(updateQuizAppMember, member))
    return updatedQuizAppMember
  },
  async deleteQuizAppProgressStatus(id) {
    const deleteQuizAppProgressStatus = `
    mutation deleteQuizAppProgressStatus($id: ID!) {
      deleteQuizAppProgressStatus(
        input: {
          id: $id
        }
      ) {
        id
      }
    }
    `
    const taskDetails = {
      id: id
    }
    return API.graphql(graphqlOperation(deleteQuizAppProgressStatus, taskDetails))
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
  },
  async onDeleteQuizAppProgressStatus(callback) {
    const subscriptionQuizAppProgressStatus = `subscription onDeleteQuizAppProgressStatus {
      onDeleteQuizAppProgressStatus {
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
  async onCreateQuizAppMember(callback) {
    const subscriptionQuizAppMember = `subscription onCreateQuizAppMember {
      onCreateQuizAppMember {
        id
        userId
        password
        score
      }
    }`
    const subscription = API.graphql(graphqlOperation(subscriptionQuizAppMember))
      .subscribe({
        next: function () {
          callback()
        }
      })
    return subscription
  },
  async onUpdateQuizAppMember(callback) {
    const subscriptionQuizAppProgressStatus = `subscription onUpdateQuizAppMember {
      onUpdateQuizAppMember {
        id
        userId
        password
        score
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