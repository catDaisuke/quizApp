<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          QuizApp
        </h1>
        <p class="subheading font-weight-regular">
        </p>
        <v-btn v-if="!isStarted" color="success"  v-on:click="createQuizAppProgressStatus">クイズ開始</v-btn>
        <div v-if="!isNextQuestion">
        <div class = "sentence">{{nowQuestion.sentence}}</div>
        <p>1 {{nowQuestion.choise1}}</p>
        <p>2 {{nowQuestion.choise2}}</p>
        <p>3 {{nowQuestion.choise3}}</p>
        <p>4 {{nowQuestion['choise4']}}</p>
        <v-btn v-if="!isNextQuestion" color="success"  v-on:click="ansQuestion">回答</v-btn>
        </div>
        <div v-if="isNextQuestion">
          <p>正解</p>
          <p>{{correctAnswer}}</p>
          <v-btn v-if="isNextQuestion" color="success"  v-on:click="nextQuestion">次の質問へ</v-btn>
        </div>
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <v-data-table
          :headers="headers"
          :items="QuizAppMembers"
          class="elevation-1"
        >
        <template v-slot:items="props">
          <td>{{ props.item.userId }}</td>
          <td class="text-xs-right">{{ props.item.score }}</td>
        </template>
  </v-data-table>
        <v-layout justify-center>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >

        <v-layout justify-center>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >

        <v-layout justify-center>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import taskService from '../services/service'
  export default {
    data: () => ({
      id: null,
      password: null,
      QuizAppProgressStatuses: [],
      QuizAppMembers: [],
      QuizAppQuestions: [],
      headers: [
        {
          text: 'ユーザー名',
          align: 'left',
          sortable: false,
          value: 'userId'
        },
        { text: 'スコア', value: 'score' },
      ],
    }),
    computed: {
      isStarted() {
        if(this.QuizAppProgressStatuses.length == 0) {
          return false
        }
        return true
      },
      isNextQuestion() {
        if(this.QuizAppProgressStatuses.length == 0) {
          return false
        }
        if(this.QuizAppProgressStatuses[0].status === 'A') {
          return true
        }
        return false
      },
      nowQuestion() {
        if(this.QuizAppProgressStatuses.length !== 0 && this.QuizAppQuestions.length >= this.QuizAppProgressStatuses[0].num) {
          return this.QuizAppQuestions[this.QuizAppProgressStatuses[0].num-1]
        } else {
          let contents = {
          sentence: '全クイズ終了',
          choise1: '',
          choise2: '',
          choise3: '',
          choise4: ''
          }
          return contents
        }
      },
      correctAnswer() {
        let num = this.QuizAppProgressStatuses[0].num
        let ans = this.QuizAppQuestions[num-1].ans
        return this.QuizAppQuestions[num-1][`choise${ans}`]
      }
    },
    async mounted () {
      this.QuizAppProgressStatuses = await taskService.getQuizAppProgressStatus()
      this.QuizAppMembers = await taskService.getQuizAppMembers()
      this.QuizAppQuestions = await taskService.getQuizAppQuestions()

      taskService.onCreateQuizAppProgressStatus(this.getQuizAppProgressStatus)
      taskService.onUpdateQuizAppProgressStatus(this.getQuizAppProgressStatus)
      taskService.onCreateQuizAppMember(this.getQuizAppMembers)
      taskService.onUpdateQuizAppMember(this.getQuizAppMembers)
    },
    methods: {
      async createQuizAppProgressStatus () {
        if(this.QuizAppProgressStatuses.length == 0) {
          await taskService.createQuizAppProgressStatus()
        } else {
          alert('クイズはすでに開始されています')
        }
      },
      async getQuizAppProgressStatus () {
        this.QuizAppProgressStatuses = await taskService.getQuizAppProgressStatus()
      },
      async getQuizAppMembers() {
        this.QuizAppMembers = await taskService.getQuizAppMembers()
      },
      async nextQuestion () {
        let quizAppProgressStatusId = this.QuizAppProgressStatuses[0].id
        let quizAppProgressStatusNum = this.QuizAppProgressStatuses[0].num
        let quizAppProgressStatusStatus = this.QuizAppProgressStatuses[0].status
        if(quizAppProgressStatusStatus === 'A') {
          let quizAppProgressStatus = {
            id: quizAppProgressStatusId,
            num: quizAppProgressStatusNum + 1,
            status: 'Q'
          }
          await taskService.updateQuizAppProgressStatus(quizAppProgressStatus)
        } else {
          alert('回答を締め切っていません')
        }
      },
      async ansQuestion () {
        let quizAppProgressStatusId = this.QuizAppProgressStatuses[0].id
        let quizAppProgressStatusNum = this.QuizAppProgressStatuses[0].num
        let quizAppProgressStatusStatus = this.QuizAppProgressStatuses[0].status
        if(quizAppProgressStatusStatus === 'Q') {
          let quizAppProgressStatus = {
            id: quizAppProgressStatusId,
            num: quizAppProgressStatusNum,
            status: 'A'
          }
          await taskService.updateQuizAppProgressStatus(quizAppProgressStatus)
        } else {
          alert('回答オープン済みです')
        }
      }
    }
  }
</script>

<style>

</style>
