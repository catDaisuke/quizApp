<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <div v-if="!isRegistered">
          <v-text-field label="ユーザーID" v-model="userId"></v-text-field>
          <v-text-field label="パスワード" v-model="password"></v-text-field>
          <v-btn color="success" v-on:click="register">登録・ログイン</v-btn>
        </div>
        <div v-if="isRegistered">
          <!-- 回答用選択画面 -->
          <div v-if="QuizAppProgressStatuses[0].status==='Q'">
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
      radioGroup: 1
    }),
    computed: {
      isRegistered() {
        for(let member of this.QuizAppMembers) {
          if(member.userId === this.userId && member.password === this.password) {
            // this.id = member.id
            return true
          }
        }
        return false
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
      async register () {
        for (let member of this.QuizAppMembers) {
          alert(member.userId)
          if(member.userId === this.userId && member.password !== this.password) {
            alert('既に本IDは登録されています')
            return
          } else if(member.userId === this.userId) {
            alert('ログインしました')
            return
          }
        }
        await taskService.createQuizAppMember(this.userId, this.password)
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
        }
      }
    }
  }
</script>

<style>

</style>
