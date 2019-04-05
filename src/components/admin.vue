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
        <div v-if="!isStarted">
          <div v-if="!isEnd">
            <v-btn v-if="!isStarted" color="success"  v-on:click="createQuizAppProgressStatus">クイズ開始</v-btn>
          </div>
          <div v-else>
            全問終了
          </div>
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
        </div>
        <div v-else>
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
            <v-btn v-if="isNextQuestion" color="success"  v-on:click="nextQuestion">次の質問へ</v-btn>
          </div>
        </div>
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <v-layout justify-center>
          <v-btn color="success"  v-on:click="reset">リセット</v-btn>
          <v-btn color="success"  v-on:click="userReset">ユーザー初期化</v-btn>
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
        console.log(this.QuizAppProgressStatuses)
        if(this.QuizAppProgressStatuses.length == 0) {
          return false
        }
        if(!this.QuizAppProgressStatuses[0].isStarted){
          return false
        }
        return true
      },
      isEnd() {
        try {
        if(this.QuizAppProgressStatuses[0].status === 'A') {
          if(this.QuizAppProgressStatuses[0].isStarted === false) {
            return true
          }
        }
        return false
        } catch (e) {
          return false
        }
      },
      isNextQuestion() {
        if(this.QuizAppProgressStatuses.length == 0) {
          return false
        }
        if(!this.QuizAppProgressStatuses[0].isStarted){
          return false
        }
        if(this.QuizAppProgressStatuses[0].status === 'A') {
          return true
        }
        return false
      },
      nowQuestion() {
        /* クイズ開始ステータス時は設問と選択肢を返却 */
        if(this.QuizAppProgressStatuses.length === 1 && this.QuizAppProgressStatuses[0].isStarted
         && this.QuizAppQuestions.length >= this.QuizAppProgressStatuses[0].num) {
          return this.QuizAppQuestions[this.QuizAppProgressStatuses[0].num-1]
        } else if(this.QuizAppProgressStatuses.length === 0) {
          let contents = {
          sentence: 'クイズ準備中',
          choise1: '',
          choise2: '',
          choise3: '',
          choise4: ''
          }
          return contents
        } else if(!this.QuizAppProgressStatuses[0].isStarted) {
          let contents = {
          sentence: 'クイズ準備中',
          choise1: '',
          choise2: '',
          choise3: '',
          choise4: ''
          }
          return contents
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
        try{
        let num = this.QuizAppProgressStatuses[0].num
        let ans = this.QuizAppQuestions[num-1].ans
        return this.QuizAppQuestions[num-1][`choise${ans}`]
        } catch(e) {
          return 'error'
        }
      }
    },
    async mounted () {
      this.QuizAppProgressStatuses = await taskService.getQuizAppProgressStatus()
      this.QuizAppMembers = await taskService.getQuizAppMembers()
      this.QuizAppQuestions = await taskService.getQuizAppQuestions()

      taskService.onCreateQuizAppProgressStatus(this.getQuizAppProgressStatus)
      taskService.onUpdateQuizAppProgressStatus(this.getQuizAppProgressStatus)
      taskService.onDeleteQuizAppProgressStatus(this.getQuizAppProgressStatus)
      taskService.onCreateQuizAppMember(this.getQuizAppMembers)
      taskService.onUpdateQuizAppMember(this.getQuizAppMembers)
    },
    methods: {
      async createQuizAppProgressStatus () {
        if(this.QuizAppProgressStatuses.length == 0) {
          await taskService.createQuizAppProgressStatus()
        } else if(!this.QuizAppProgressStatuses[0].isStarted){
          let quizAppProgressStatus = {
            id: this.QuizAppProgressStatuses[0].id,
            num: 1,
            status: 'Q',
            isStarted: true
          }
          await taskService.updateQuizAppProgressStatus(quizAppProgressStatus)
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

        if(quizAppProgressStatusStatus === 'A' && quizAppProgressStatusNum != this.QuizAppQuestions.length) {
          let quizAppProgressStatus = {
            id: quizAppProgressStatusId,
            num: quizAppProgressStatusNum + 1,
            status: 'Q',
            isStarted: true
          }
          await taskService.updateQuizAppProgressStatus(quizAppProgressStatus)
        } else if (quizAppProgressStatusStatus === 'A' && quizAppProgressStatusNum == this.QuizAppQuestions.length){
          alert('全問題終了')
          // let quizAppProgressStatusId = this.QuizAppProgressStatuses[0].id
          // let quizAppProgressStatusNum = this.QuizAppProgressStatuses[0].num
          // let quizAppProgressStatusStatus = this.QuizAppProgressStatuses[0].status
          let quizAppProgressStatus = {
            id: quizAppProgressStatusId,
            num: quizAppProgressStatusNum,
            status: 'A',
            isStarted: false
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
            status: 'A',
            isStarted: true
          }
          await taskService.updateQuizAppProgressStatus(quizAppProgressStatus)
        } else {
          alert('回答オープン済みです')
        }
      },
      async reset() {
        alert('reset')
        // if(this.QuizAppProgressStatuses.length > 0) {
        //   for(let status of this.QuizAppProgressStatuses) {
        //     await taskService.deleteQuizAppProgressStatus(status.id)
        //   }
        // }
        let quizAppProgressStatus = {
            id: this.QuizAppProgressStatuses[0].id,
            num: 1,
            status: 'Q',
            isStarted: false
        }
        await taskService.updateQuizAppProgressStatus(quizAppProgressStatus)
      },
      /**
       * 全ユーザー削除
       */
      async userReset() {

      }
    }
  }
</script>

<style>

</style>
