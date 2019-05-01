<template>
  <v-container fluid>
    <v-toolbar app color="#ffc0cb">
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title class="font-weight-light title">Wedding Quiz</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="hidden-sm-and-down"> -->
        <div class="font-weight-light">{{userId}}</div>
        <v-spacer></v-spacer>
        <div flat class="font-weight-light"><div v-if="isStarted">score : {{score}}</div></div>
        <!-- <v-btn flat>Link Three</v-btn> -->
        <!-- </v-toolbar-items> -->
    </v-toolbar>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <div v-if="!isLogin">
          <v-text-field label="ユーザーID" v-model="userId"></v-text-field>
          <!-- <v-text-field label="パスワード" v-model="password"></v-text-field> -->
          <v-btn color="success" v-on:click="register">登録</v-btn>
        </div>
        <div v-else-if="isLogin">

          <!-- 回答用選択画面 -->
          <div v-if="isStarted && ansQuestionCount < QuizAppProgressStatuses[0].num">
            <p>{{QuizAppQuestions[QuizAppProgressStatuses[0].num-1].sentence}}</p>
            <v-radio-group v-model="radioGroup">
              <v-radio
                v-for="n in 4"
                :key="n"
                :label="`${n}：` + QuizAppQuestions[QuizAppProgressStatuses[0].num-1]['choise'+n]"
                :value="n"
              ></v-radio>
            </v-radio-group>
            <v-btn color="success"  v-on:click="ansQuestion">回答</v-btn>
          </div>
          <div v-else-if="isStarted && QuizAppProgressStatuses[0].status==='Q'" class="standby">
            <div class="status">waiting...</div>
            <v-progress-circular
              indeterminate
              :size="70"
              :width="7"
              color="green"
            ></v-progress-circular>
          </div>
          <div v-else-if="isStarted && QuizAppProgressStatuses[0].status==='A'">
            <div v-if="isThisAnsCorrect">
              <div class="correct">○</div>
              <div>correct!</div>
            </div>
            <div v-else>
              <div class="mistake">×</div>
              <div>mistake</div>
            </div>
          </div>
        <div v-if="!isStarted && !isEnd" class="standby">
          <div class="status">waiting...</div>
          <v-progress-circular
            indeterminate
            :size="70"
            :width="7"
            color="green"
          ></v-progress-circular>
        </div>
        <div v-if="isEnd">終了</div> 
        </div>
      </v-flex>

      <v-flex mb-4>
      </v-flex>

      <v-flex
        mb-5
        xs12
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
      userId: null,
      id: null,
      password: null,
      QuizAppProgressStatuses: [],
      QuizAppMembers: [],
      QuizAppQuestions: [],
      radioGroup: 1,
      ansQuestionCount: 0,
      isThisAnsCorrect: false,
      isLogin: false,
      score: 0
    }),
    watch: {
      /* ある質問が回答公開されたとき、ユーザーが回答していなかった場合、
      強制的に回答番号を進め、現在の回答ステータス不正解にする */
      QuizAppProgressStatuses: {
        handler(val) {
          if(this.ansQuestionCount < val[0].num && val[0].status === 'A') {
            this.ansQuestionCount = val[0].num
            this.isThisAnsCorrect = false
          }
        },
        deep:true
      }
    },
    computed: {
      /* クイズ開始されたかどうか */
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
      /* 問題終了したかどうか */
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
      isRegistered() {
        for(let member of this.QuizAppMembers) {
          if(member.userId === this.userId) {
            // this.id = member.id
            return true
          }
        }
        return false
      },
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
      if(!localStorage.QuizAppuserId) {
        return
      } else {
        for (let member of this.QuizAppMembers) {
          if(member.userId === localStorage.QuizAppuserId) {
            this.userId = localStorage.QuizAppuserId
            this.score = member.score
            this.isLogin = true
            return
          }
        }
        localStorage.removeItem('QuizAppuserId')
      }
    },
    methods: {
      async register () {
        for (let member of this.QuizAppMembers) {
          if(member.userId === this.userId) {
            alert('既に本IDは登録されています')
            return
          }
        }
        await taskService.createQuizAppMember(this.userId)
        localStorage.QuizAppuserId = this.userId
        this.isLogin = true
      },
      async createQuizAppProgressStatus () {
        let status = await taskService.createQuizAppProgressStatus()
        console.log(status)
      },
      async getQuizAppProgressStatus () {
        this.QuizAppProgressStatuses = await taskService.getQuizAppProgressStatus()
      },
      async getQuizAppMembers() {
        this.QuizAppMembers = await taskService.getQuizAppMembers()
      },
      async updateQuizAppProgressStatus () {
        let quizAppProgressStatus = {
          id: '831e2d01-d3d0-4fc5-a067-5ada10ee0198',
          num: 51,
          status: 'Q'
        }
        await taskService.updateQuizAppProgressStatus(quizAppProgressStatus)
      },
      async ansQuestion () {
        /* 回答比較 */
        if(this.ansQuestionCount < this.QuizAppProgressStatuses[0].num) {
          let target = this.QuizAppMembers.find((member) => {return member.userId === this.userId})
          console.log(target)
          if(this.QuizAppQuestions[this.QuizAppProgressStatuses[0].num -1].ans === this.radioGroup) {
            let member = {
              id: target.id,
              userId:this.userId,
              password: this.password,
              score: target.score + 1
            }
            await taskService.updateQuizAppMember(member)
            this.ansQuestionCount = this.QuizAppProgressStatuses[0].num
            this.isThisAnsCorrect = true
            this.score = this.score + 1
          } else {
            this.ansQuestionCount = this.QuizAppProgressStatuses[0].num
            this.isThisAnsCorrect = false
          }
        } else {
            alert('回答済みです')
        }
      }
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Great+Vibes');

.status{
  margin-bottom: -3rem;
}
.standby {
  margin-top:10rem;
}
.title {
  font-family: 'Great Vibes', cursive !important;
}
</style>
